'use client';

import BackButton from "@/app/components/BackButton";
import FormPost from "@/app/components/FormPost"
import { FormInputPost } from "@/app/types"
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form"

interface EditPostPageProps{
  params: {
    id: string
  }
}

const EditPostPage: FC<EditPostPageProps> = ({ params }) => {

    const { id } = params;
    const router = useRouter();

    
    const { data: dataPost, isLoading: isLoadingPost } = useQuery({
      queryKey: ['posts', id],
      queryFn: async () => {
        const response = await axios.get(`/api/posts/${id}`);
        return response.data;
      },
    })

    const {mutate: updatePost} = useMutation({
      mutationFn: (newPost: FormInputPost) => {
          return axios.patch(`/api/posts/${id}`, newPost)
      },
      onError: (error) => {
          console.log(error);
      },
      onSuccess: () => {
          router.push('/');
          router.refresh();
      }
    })
  
    const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
        updatePost(data);
    }

    if(isLoadingPost){
      return (
        <div className="text-center">
          <span className="loading loading-spinner"></span>
        </div>
      )
    }

  return (
    <div>
        <BackButton />
        <h1  className='text-2xl  font-bold text-center'>Edit Book</h1>
        <FormPost submit={handleEditPost} initialValue={dataPost} isEditing={true}/>
    </div>
  )
}

export default EditPostPage;