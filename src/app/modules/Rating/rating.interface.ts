import { Types } from "mongoose";

export interface IRating {
   recipe : Types.ObjectId;
    user: Types.ObjectId;
    rating: number; // 1 to 5
  }