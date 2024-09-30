import { model, Schema } from 'mongoose'
import { IIngredient } from './ingredient.interface';
 
 

export const ingredientSchema = new Schema<IIngredient>({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Spices', 'Vegetables', 'Meat', 'Dairy', 'Other'],
    default: 'Other',
  },
})

export const Ingrediten = model<IIngredient>("Ingredient", ingredientSchema);