'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { Pencil } from 'lucide-react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface ButtonActionProps {
    id: number
}

const ButtonAction: FC<ButtonActionProps> = ({id}) => {

    const router = useRouter();

    const {mutate: deletePost} = useMutation({
        mutationFn: async () => {
            return axios.delete(`/api/posts/${id}`)
        },
        onError: (error) => {
            console.log(error);
        },
        onSuccess: () => {
            router.push('/');
            router.refresh();
        }
    })

  return (
    <div>
        <Link href={`/edit/${id}`} className='btn mr-2'>
        <Pencil />Edit
        </Link>
        <button onClick={ () => deletePost() } className="btn btn-error">
            <Trash />
            Delete
        </button>
    </div>
  )
}

export default ButtonAction