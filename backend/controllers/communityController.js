import communityPost from "../models/communityPosts.js";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export const registerCommunityPosts = async (req, res) => {
  try {
    const { docName, createdTime, contents } = req.body;
    // Validate required fields
    if (!docName || !contents) {
      return res.status(400).json({
        success: false,
        message: "Doctor name and contents are required.",
      });
    }

    let imageURL = null;

    // Upload image if provided
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageURL = uploadResult.secure_url;
    }

    // Create new post
    const newPost = new communityPost({
      docName,
      createdTime,
      image: imageURL,
      contents,
    });

    await newPost.save();

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating post",
    });
  }
};



export const getCommunityPosts = async (req, res) => {
   try {
       // Fetch all posts from the database
         const posts = await communityPost.find({});
         console.log("Fetched posts:", posts);
       res.status(200).json({ success: true, data: posts });
   } catch (error) {
       res.status(500).json({ success: false, message: "Server Error" });
   }
}