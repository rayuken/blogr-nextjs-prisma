import axios from 'axios';
import { useState } from 'react';

const EditModal = ({ post, onEdit }) => {
    const [newTitle, setNewTitle] = useState(post?.title);
    const [newContent, setNewContent] = useState(post?.content);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        console.log("OPEN");
        // Fetch the existing post data and populate the modal fields
        // (You may need to implement a function to fetch post details by ID)
        // Example: fetchPostDetails(postId).then((data) => {
        //   setNewTitle(data.title);
        //   setNewContent(data.content);
        // });

        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSave = async () => {
        try {
            const res = await axios.put("/api/posts", { title: newTitle, content: newContent, id: post.id });
            console.log("RESP up", res);
            if (!res.status === 200) {
                throw new Error('Could not save post');
            }
            // For now, let's just log the new values
            console.log('Updated Title:', newTitle);
            console.log('Updated Content:', newContent);
            onEdit();
            // Close the modal
            closeModal();
        } catch (error) {
            console.log("ERROR:", error);
        }
    };

    return (
        <div className='grid'>
            {/* Button to open the modal */}
            <button onClick={openModal} className="bg-yellow-300 text-gray-950 rounded-md h-8">Edit</button>


            {/* The Modal */}
            {isOpen && (
                <div>
                    <div className='p-4'>
                        <label>Title:</label>
                        <input className='text-gray-900' type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    </div>
                    <div className='p-4'>
                        <label>Content:</label>
                        <textarea className='text-gray-900' value={newContent} onChange={(e) => setNewContent(e.target.value)} />
                    </div>
                    <div>
                        <button className='bg-green-600 p-2 m-1 rounded-md' onClick={handleSave}>Save</button>
                        <button className='bg-red-500 p-2 m-1 rounded-md' onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditModal;
