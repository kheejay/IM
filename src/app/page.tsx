'use client';

import axios from "axios";
import PostCard from "./components/PostCard";
import { useState, useEffect, SetStateAction } from "react";

interface Book {
  ISBN: string;
  bookTitle: string;
  bookAuthor: string;
  yearOfPublication: number;
  publisher: string;
  imageUrlM: string;
}

async function getBooks() {
  const response = await axios.get("../api/books");
  console.log(response);
  return response.data; // Return the data from the response
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]); // State to store books
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    async function fetchBooks() {
      const data = await getBooks();
      setBooks(data);
    }
    fetchBooks();
  }, []); // Empty dependency array to fetch books only once

  const searchFilter = (books: Book[]) => {
    return books.filter(
      (book) => (
        book.bookTitle.toLowerCase().includes(query.toLowerCase()) ||
        book.bookAuthor.toLowerCase().includes(query.toLowerCase()) ||
        book.yearOfPublication.toString().includes(query.toLowerCase())

        
      )
    );
  }

  const filteredBooks = searchFilter(books);

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setQuery(e.target.value);
  }

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2 mt-20">
        <input type="text" className="grow" onChange={handleChange} placeholder="Search Title" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
          <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
        </svg>
      </label>
      <main className="grid items-center justify-items-stretch md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {filteredBooks.map((book: Book) => ( 
          <PostCard key={book.ISBN} post={book} />
        ))}
      </main>
    </div>
  );
}
