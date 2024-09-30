import { Types } from "mongoose";
import { IIngredient } from "../Ingredient/ingredient.interface";
import { IRating } from "../Rating/rating.interface";
import { IComment } from "../Comment/comment.interface";
import { IVote } from "../Vote/vote.interface";
 



export interface ITimer {
  id: string;
  step: string;
  duration: number; // Duration in seconds
  isActive: boolean;
}





export interface IRecipe {
  title: string;
  description?: string;
  ingredients: IIngredient[];
  instructions: string;
  images: string[]; // URLs to images
  author: Types.ObjectId;
  isPremium: boolean;
  isDeleted: boolean;
  isPublished: boolean;
  tags?: string[];
  cookingTime: number; // In minutes
  ratings?: IRating[];
  comments?: IComment[];
  votes?: IVote[];
  averageRating?: number;
  voteScore?: number;
}
