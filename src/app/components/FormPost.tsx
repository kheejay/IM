'use client';

import { useQuery } from "@tanstack/react-query";
import { FormInputPost } from "../types";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Radio } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";


interface FormPostProps {
        submit: SubmitHandler<FormInputPost>;
        isEditing: boolean;
        initialValue?: FormInputPost;
}

const FormPost: FC<FormPostProps> = ({submit, isEditing, initialValue}) => {

    const { register, handleSubmit} = useForm<FormInputPost>({
        defaultValues: initialValue,
    });

    //fetch list tags
    const {data: dataTags, isLoading: isLoadingTags} = useQuery<[]>({
        queryKey: ['tags'],
        queryFn: async () => {
            const response = await axios.get('/api/tags');
            return response.data;
        },
    });
    
  return (
    <div>
        <form onSubmit={handleSubmit(submit)} className='flex flex-col items-center justify-center gap-1 mt-5'>
            <Label className="text-sm float-start text-slate-700">Book Title</Label>
            <input type="text" {...register("bookTitle", {required: true})} placeholder="Book title..." className="input input-bordered w-full max-w-lg" />
            <Label className="text-sm">Book Author</Label>
            <input type="text" {...register("bookAuthor", {required: true})} placeholder="Author" className="input input-bordered w-full max-w-lg" />
            <Label className="text-sm">ISBN</Label>
            <input type="text" {...register("ISBN", {required: true})} placeholder="ISBN" className="input input-bordered w-full max-w-lg" />
            <Label className="text-sm">Publication Year</Label>
            <input type="text" {...register("yearOfPublication", {required: true})} placeholder="Publication Year" className="input input-bordered w-full max-w-lg" />
            <Label className="text-sm">Publisher</Label>
            <input type="text" {...register("publisher", {required: true})} placeholder="Publisher" className="input input-bordered w-full max-w-lg" />  
            <Label className="text-sm">Book Image URL</Label>
            <input type="text" {...register("imageUrlM", {required: true})} placeholder="Book Image URL (http://image.address) " className="input input-bordered w-full max-w-lg" />    
            <button type="submit" className='btn btn-primary w-full max-w-lg mt-5'>
                {isEditing ? 'Update' : 'Add'}
            </button>
        </form>
    </div>
  )
}

export default FormPost;