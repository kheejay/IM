'use client';

import { link } from "fs";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {

    const router = useRouter();

  return (
    <div className="mt-20">
        <button className="btn" onClick={() => router.push('/')}>
            <ChevronLeft />BACK
        </button>
    </div>
  )
}

export default BackButton