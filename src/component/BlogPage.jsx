/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogPost from "./BlogPost";
import { useNavigate } from "react-router-dom";

const BlogPAge = () => {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  // const [relatedblogs, setRelatedBlogs] = useState([]);
  const BASE_URl = import.meta.env.VITE_URl;
  const fetchBlog = async (req, res) => {
    try {
      const result = await axios.get(`${BASE_URl}/get`);

      setBlog(result.data.post);
      // console.log(result.data.post);
      console.log(blog);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div>
      {blog.map((post) => (
        <div key={post.id}>
          <BlogPost post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPAge;
