import mongoose, { model, Schema } from "mongoose";
import { IVote } from "./vote.interface";

const voteSchema = new Schema<IVote>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
        vote: { type: Number, enum: [1, -1], required: true }, // 1 for upvote, -1 for downvote
      },
      { timestamps: true }
);

export const Vote = model<IVote>("Vote", voteSchema);