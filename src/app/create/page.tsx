'use client';

import React from 'react'
import FormPost from '../components/FormPost'
import { SubmitHandler } from 'react-hook-form'
import { FormInputPost } from '../types'
import BackButton from '../components/BackButton';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreatePage = () => {

    const router = useRouter();

    const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
        createPost(data);
    };

    const {mutate: createPost} = useMutation({
        mutationFn: (newPost: FormInputPost) => {
            return axios.post('/api/posts/create', newPost)
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
        <BackButton />
        <h1 className='text-2xl  font-bold text-center'>Add new book</h1>
        <FormPost submit={handleCreatePost} isEditing={false}/>
    </div>
  )
}

export default CreatePage;