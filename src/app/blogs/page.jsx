"use client"
import SearchInput from '@/components/search-input';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const BlogsPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/posts${searchTerm ? `?search=${searchTerm}` :  ""}`);
      console.log("RESP", response.data.posts);
      const data = response.data.posts;
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    if(searchTerm) return
    fetchData();
  }, [searchTerm]);

  return (
    <div className='max-w-4xl mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-4'>Blogs</h1>
      {<SearchInput setSearchTerm={setSearchTerm} search={fetchData} />}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.id}`}
            className='bg-white p-4 rounded-md shadow-md text-gray-950'
          >
            <h2 className='text-xl font-bold'>{post.title}</h2>
            <p>Written by: {post?.author?.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
