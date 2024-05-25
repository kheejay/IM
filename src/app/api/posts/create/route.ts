import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {

        const body = await request.json();

        const post = await db.book.create({
            data: {
                ISBN: body.ISBN,
                bookTitle: body.bookTitle,
                bookAuthor: body.bookAuthor,  
                yearOfPublication: Number(body.yearOfPublication),
                publisher: body.publisher,
                imageUrlL: body.imageUrlL,
                imageUrlM: body.imageUrlM,
                imageUrlS: body.imageUrlS,
            },
        });
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'CANNOT CREATE POST' }, { status: 500 });
    }
}
