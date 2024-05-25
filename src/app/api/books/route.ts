import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        // Fetch books with select and order conditions
        const booksWithRatings = await db.book.findMany({
            select: {
                ISBN: true,
                bookTitle: true,
                bookAuthor: true,
                yearOfPublication: true,
                imageUrlM: true,
                library: true,
                Reviews: true, // Include book ratings in the selection
            },
            orderBy: {
                bookTitle: "asc",
            },
            take: 1000
        });

        // Calculate average rating for each book
        const books = booksWithRatings.map(book => {
            const totalRating = book.Reviews.reduce((acc, curr) => acc + curr.bookRating, 0);
            const averageRating = totalRating / book.Reviews.length || 0;
            return {
               ...book,
                averageRating: averageRating,
            };
        });

        // Sort books by average rating in descending order
        books.sort((a, b) => b.averageRating - a.averageRating);

        // Return the enriched book list
        return NextResponse.json(books, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'CANNOT FETCH BOOKS' }, { status: 500 });
    }
}
