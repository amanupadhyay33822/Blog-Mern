/* eslint-disable no-undef */
const Post = require("../models/Post");

/* eslint-disable no-unused-vars */
exports.createPost = async (req, res, next) => {
    try {
        const { title, author, date, category, content, img } = req.body;
        if (!title || !author || !category || !content) {
          return res.status(401).json({
            sucess: false,
            message: "all fields are required",
          });
        }
      
        const post = await Post.create({
          title,
          author,
          date,
          category,
          content,
          img,
        });
        return res.status(200).json({
            sucess: true,
            post
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
          sucess: false,
          message: error.message,
        });
    }

};
exports.getPost = async(req, res, next)=>{
  try {
    const post = await Post.find({});
     return   res.status(200).json({
      sucess: true,
      post
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
  

}
