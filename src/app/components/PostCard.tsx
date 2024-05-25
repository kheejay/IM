import Link from 'next/link';
import { FC } from 'react';

interface PostCardProps{
    post: {
        ISBN: string;
        bookTitle: string;
        bookAuthor: string;
        yearOfPublication: number;
        imageUrlM: string;
    }
}
const PostCard: FC<PostCardProps> = ({ post }) => {
    
    const { ISBN, bookTitle, bookAuthor, yearOfPublication, imageUrlM} = post;
    
    
    return (
        // <div className="card w-full bg-base-100 shadow-xl border ">
        //     <div className="card-body bg-cover bg-center rounded-lg shadow-lg ">
        //     <Image src="/lizard.png" className='rounded-lg shadow-lg' alt="Description of the image" width={600} height={400} />
        //         <h2 className="card-title font-bold max-h-12 min-h-12 mb-2">{ bookTitle.slice(0, 22) }</h2>
        //         <p className='text-sm place-self-start mb-0'>by {bookAuthor.slice(0, 30)}</p>
        //         <div className="card-actions justify-end">
        //         <span className="badge badge-neutral place-self-end mb-2 mt-3">{yearOfPublication}</span>
        //             <Link href={`/blog/${ISBN}`} className='hover:underline text-sm'>More details...</Link>
        //         </div>
        //     </div>
        // </div>

        <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
            <img
                alt=""
                src={imageUrlM} 
                className="h-56 w-full object-cover"
            />

            <div className="bg-white p-4 sm:p-6">
                <time dateTime="2022-10-10" className="block text-xs text-gray-500"> { yearOfPublication } </time>

                
                <h3 className="mt-0.5 text-lg text-gray-900">{bookTitle.slice(0, 30)}</h3>
                

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 mb-11">
                by {bookAuthor}
                </p>
                <a className="group relative inline-block focus:outline-none focus:ring" href="#">
                    <span
                        className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                    ></span>

                    <span
                        className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"

                    >
                       <Link href={`/blog/${ISBN}`}>more details...</Link>
                    </span>
                    </a>
            </div>
            </article>

    )
}

export default PostCard
{/* <div className="card w-full h-96 bg-base-100 shadow-xl border">
    <div className=' mt-5 place-self-center w-25'>
    <img  src={imageUrlM} width={100} alt="Failed to load image" className="rounded-lg shadow-lg" />
    </div>
    <div className="card-body">
        <h2 className="card-title font-bold tracking-tight max-h-14 min-h-14">{ bookTitle.slice(0, 20) }</h2>
        <p>by {bookAuthor.slice(0, 15)}</p>   
            
            <span className="badge badge-neutral place-self-end mt-3 ml-20">{yearOfPublication}</span>
        <Link href={`/blog/${ISBN}`} className='p-4 hover:underline text-sm'>More details...</Link>
    </div>
    </div> */}