"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EditModal from "@/components/edit-modal"
interface PostsConst {
  id: string
  title: string
  author:{name:string}

}

const MyBlogList = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<PostsConst[]>([]);
  const fetchData = async () => {
    console.log("stdtus", status);
    
    if(status!=="authenticated") return
    try {
      const response = await axios.get(
        `/api/posts${
          session?.user?.email ? `?search=${session?.user?.email}` : ""
        }`
      );
      console.log("RESP", response.data.posts);
      const data = response.data.posts;
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [status]);

  const handleDelete = async (postId:string) =>{
    try {
      const {data, status} = await axios.delete(`/api/posts/${postId}`);
      console.log("RESP up", data);
      if (status !== 200 ) {
          throw new Error('Could not save post');
      }
      fetchData();
  } catch (error) {
      console.log("ERROR-Delete:", error);
  }
    
  }

  return (
    <div className="flex flex-col basis-1/2 bg-gray-800 justify-center text-center rounded-md">
      <div>Welcome {session?.user?.name ?? "Stranger"}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {posts.map((post) => (
          <div key={post.id} className="grid gap-2">
          <Link
            key={post.id}
            href={`/blogs/${post.id}`}
            className="bg-white p-4 rounded-md shadow-md text-gray-950"
          >
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>Written by: {post?.author?.name}</p>
          </Link>
          <EditModal post={post} onEdit={fetchData} />
          <button onClick={()=>{handleDelete(post.id)}} className="bg-red-600 rounded-md h-8">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogList;
