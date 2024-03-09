/* eslint-disable react/prop-types */
import React from "react";

const BlogPost = ({ post }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-8 mt-4">
      {/* <h2 className="text-3xl font-bold text-blue-800 bg-green-200 p-4">
        Post
      </h2> */}
      <img
        className="w-full h-64 object-cover object-center"
        src={post.img}
        alt="Blog Post"
        style={{ objectFit: "cover" }}
        loading="lazy"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">{post.title}</h2>
        <div className="flex items-center mb-4">
          <p className="text-gray-600 text-sm">By {post.author}</p>
          <span className="mx-2 text-gray-400">&bull;</span>
          <p className="text-gray-600 text-sm">{post.date}</p>
          <span className="mx-2 text-gray-400">&bull;</span>
          <p className="text-gray-600 text-sm">{post.category}</p>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;
