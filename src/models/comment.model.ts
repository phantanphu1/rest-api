import mongoose, { Schema } from "mongoose";
import { IComment } from "../types/comment";

const commentSchema = new mongoose.Schema<IComment>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        content: {
            type: String,
            required: true,
        },
        dateTime: {
            type: Number,
            required: true,

        },
        like: [{ type: String, required: false, default: [] }],
        songId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;