import BackButton from "@/app/components/BackButton"
import ButtonAction from "@/app/components/ButtonAction"
import { db } from "@/app/lib/db";
import { FC } from "react";

interface BlogDetailPageProps {
    params: {
        id: number;
    }        
}

async function getBook(id: number) {

    const reponse = await db.book.findFirst({
        where: {
            ISBN: String(id),
        },
        select: {
            ISBN: true,
            bookTitle: true,
            bookAuthor: true,
            yearOfPublication: true,
            library: true,
            publisher: true,
            imageUrlM: true,
        }
    });
    return reponse;
}

   


const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {

    const book = await getBook(params.id);
    const lib = (book?.library === 1) ? 'Iloilo Provincial Library and Archives' : 'Ilolo City Public Library';

    
return (
    <div>
        <BackButton />
        <a className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 mt-10"
            >
            <span
                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-slate-900 via-slate-600 to-slate-300"
            ></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                <p className="text-4xl font-bold text-gray-900 absolute top-10 left-10">
                    {book?.bookTitle}
                    <p className="mt-1 text-sm font-medium text-gray-600">by { book?.bookAuthor }</p>
                </p>

                </div>

                <div className="hidden sm:block sm:shrink-0">
                <img
                    alt=""
                    src={book?.imageUrlM}
                    className="size-15 rounded-lg object-cover shadow-md sm:w-40 sm:h-60"
                />
                </div>
                    </div>

                <div className="absolute left-10 top-40">
                    <div className="mt-4">
                        <p className="text-pretty text-sm text-gray-500">
                        Library: {lib}
                        </p>
                        <p className="text-pretty text-sm text-gray-500">
                        ISBN: {book?.ISBN} | from: {book?.publisher}
                        </p>
                    </div>

                    <dl className="mt-6 flex gap-4 sm:gap-6">
                        <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600">Published on</dt>
                        <dd className="text-xs text-gray-500">{book?.yearOfPublication}</dd>
                        </div>

                        <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600">Reading time</dt>
                        <dd className="text-xs text-gray-500">3 minute</dd>
                        </div>
                    </dl>
                </div>
                    </a>
            <br />
            <ButtonAction id={params.id} />
        </div>
)
}

export default BlogDetailPage
    // <div>
    //     <BackButton />
    //     <div className="mb-8 mt-5 bg-inherit dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
    //         <h2 className="text-2xl font-bold my-4">{book?.bookTitle}</h2>
    //         <span className="badge badge-neutral">{book?.yearOfPublication}</span>
    //         <p className="text-slate-700 font-bold mt-2">Author: {book?.bookAuthor}</p>
    //         <p className="text-slate-700 font-bold mt-1">Publlisher: {book?.publisher}</p>
    //         <p className="text-slate-700 font-bold mt-1">Publication Year: {book?.yearOfPublication}</p>
    //         <p className="text-slate-700 font-bold mt-1">ISBN: {book?.ISBN}</p>
    //         <p className="text-slate-700 font-bold mt-1">Library: {lib} </p>
    //     </div>
    
    //     <ButtonAction id={params.id} />
    // </div>