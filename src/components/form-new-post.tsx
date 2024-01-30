"use client";

import { FormData } from "@/types/blog";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import Loader from "./loading";

const inputClass =
  "w-full py-2 px-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring focus:border-blue-300";

const FormNewPost = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const { data } = useSession();
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        errors[key] = "required field";
      }
    });

    // Mostrar mensajes de error si existen
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("api/posts", formData);

      if (response.status === 200) {
        router.push(`/blogs/${response.data.newPost.id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-md mx-auto p-4 text-black" onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          className={inputClass}
          placeholder="Enter the title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      {formErrors.title && (
        <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
      )}
      <div className="mb-4">
        <ReactTextareaAutosize
          minRows={5}
          name="content"
          className={inputClass}
          placeholder="Enter the content"
          value={formData.content}
          onChange={handleChange}
        />
        {formErrors.content && (
          <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>
        )}
      </div>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <button
          disabled={!data?.user?.email}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400"
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default FormNewPost;
