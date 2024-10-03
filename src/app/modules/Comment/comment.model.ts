import mongoose, { Schema, model } from 'mongoose';
import { IComment } from '../Recipes/recipes.interface';

// Comment Schema
const commentSchema = new Schema<IComment>(
  {
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// Export Comment Model
export const Comment = model<IComment>('Comment', commentSchema);
