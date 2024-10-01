import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../Auth/auth.model";
import { IRecipe } from "./recipes.interface";
import { Recipe } from "./recipes.model";
import { JwtPayload } from "jsonwebtoken";

const createRecipesIntoDb = async (payload : IRecipe) => {
    const {author} = payload;
    const user = await User.findById(author);
    if(!user){
        throw new AppError(httpStatus.BAD_REQUEST, "User not found")
    }
    const result = await Recipe.create(payload);
    return result;
}

const getAllRecipes = async (user : JwtPayload) => {
     let result;

     if(user?.role === "admin"){
        result = await Recipe.find({isDeleted : false, isPublished : true});
     } else if (user?.isPremium) {
        result = await Recipe.find({isDeleted : false, isPublished : true});
      }  else {
        result = await Recipe.find({isDeleted : false, isPublished : true, isPremium : false});// Only return non-premium recipes
      }
      return result;
}

const getRecipeById = async (id : string) => {
    const result = await Recipe.findById(id);
    if(result.isDeleted){
        throw new AppError(httpStatus.NOT_FOUND, "This recipe is deleted")
    }
    if(!result.isPublished){
        throw new AppError(httpStatus.BAD_REQUEST, "This service is not published")
    }
    return result;
}

const deleteRecipesFromDb = async (id : string) => {
    const result = await Recipe.findByIdAndDelete(id);
    return result;
}


export const RecipeServices = {
    createRecipesIntoDb,
    deleteRecipesFromDb,
    getAllRecipes,
    getRecipeById
}