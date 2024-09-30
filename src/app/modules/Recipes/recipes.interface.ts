import { Types } from "mongoose";
import { IIngredient } from "../Ingredient/ingredient.interface";
 



export interface ITimer {
  id: string;
  step: string;
  duration: number; // Duration in seconds
  isActive: boolean;
}

export interface IRating {
  id: string;
  user: Types.ObjectId;
  rating: number; // 1 to 5
}

export interface IComment {
  id: string;
  user: Types.ObjectId;
  content: string;
}

export interface IVote {
  id: string;
  user: Types.ObjectId;
  vote: 1 | -1;
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
  comments?: Comment[];
  votes?: IVote[];
  averageRating?: number;
  voteScore?: number;
}
