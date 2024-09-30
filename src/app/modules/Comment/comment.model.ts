import mongoose, { model, Schema } from "mongoose";
import { IComment } from "./comment.interface";

const commentSchema = new Schema<IComment>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
        content: { type: String, required: true },
    },{ timestamps: true }
)

export const Comment = model<IComment>("Comment", commentSchema);