import mongoose from "mongoose";

// Define the schema
const postSchema = new mongoose.Schema({
    docName: {
        type: String,
        required: true,
    },
    createdTime: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL or file path
        default: null
    },
    contents: {
        type: String,
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' }
});

// Create a model
const communityPost = mongoose.models.Post || mongoose.model('Post', postSchema);
export default communityPost;
