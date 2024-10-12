import { Types } from "mongoose";

export interface IRating {
  _id: IRating;
  recipe: Types.ObjectId;
  user: Types.ObjectId;
  rating: number; // 1 to 5
}

export interface IIngredient {
  name: string;
  category: 'Spices' | 'Vegetables' | 'Meat' | 'Dairy' | 'Other';
}

export interface ITimer {
  id: string;
  step: string;
  duration: number; // Duration in seconds
  isActive: boolean;
}

export interface IComment {
  user?: Types.ObjectId;
  recipe: Types.ObjectId;
  content: string;
}

export interface IVote {
  recipe: Types.ObjectId;
  user: Types.ObjectId;
  vote: 1 | -1;
}

export interface IRecipe {
  title: string;
  description?: string;
  ingredients?: IIngredient[];
  instructions?: string;
  images: string[]; // URLs to images
  author?: Types.ObjectId;
  isPremium: boolean;
  isDeleted: boolean;
  isPublished: boolean;
  tags?: string[];
  cookingTime: number; // In minutes
  ratings?: IRating[]; // List of user ratings
  comments?: IComment[]; // List of comments
  votes?: IVote[]; // List of upvotes and downvotes
  // Computed fields (optional)
  averageRating?: number;  // Average rating computed from ratings[]
  voteScore?: number;      // Sum of votes (upvotes vs. downvotes)
  ratingCounts?: number;   // Number of users who rated
  commentCounts? : number;
}
