import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

interface contextProps {
    params: {
        postId: string;
    }
}

export async function DELETE(req: Request, context: contextProps) {
    try {
        const {params} = context;
        await db.book.delete({
            where: {
                ISBN: params.postId,
            }
        });
        return new Response(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ message: 'could not delete book' }, { status: 500 });
    }
}

export async function PATCH(req: Request, context: contextProps) {
    try {
        const { params } = context;
        const body = await req.json();
        

        await db.book.update({
            where: {
                ISBN: params.postId,
            },
            data: {
                ISBN: body.ISBN,
                bookTitle: body.bookTitle,
                bookAuthor: body.bookAuthor,  
                yearOfPublication: Number(body.yearOfPublication),
                publisher: body.publisher,
                imageUrlS: body.imageUrlS,
                imageUrlM: body.imageUrlM,
                imageUrlL: body.imageUrlL,
            },
        });
        return NextResponse.json({ message: 'update success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'failed to update' }, { status: 500 });
    }
}

export async function GET(req: Request, context: contextProps) {
    try {
        const { params } = context;
        const book = await db.book.findFirst({
            where: {
                ISBN: params.postId
            }
        });
        return NextResponse.json(book, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'could not fetch genres' }, { status: 500 });
    }
}