import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 300 },
});

const Token = mongoose.model("token", tokenSchema);
export default Token;
