import express from 'express';
import {getCommunityPosts, registerCommunityPosts} from "../controllers/communityController.js";
import upload from '../middleware/multer.js';

const communityRouter = express.Router();

communityRouter.get("/all-posts", getCommunityPosts);
communityRouter.post("/posts-to-add", upload.single("image"), registerCommunityPosts);

export default communityRouter;
