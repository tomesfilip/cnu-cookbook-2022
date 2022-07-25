import IIngredient from '../models/IIngredient';
import IRecipeDetail from '../models/IRecipeDetail';
import RecipeFormValues from '../models/RecipeFormValues';
import IRecipeFormValues from '../models/RecipeFormValues';
import { getSlug } from './getSlug';

export const createRecipe = ({
  title,
  preparationTime,
  ingredients,
  directions,
  servingCount,
  sideDish,
}: RecipeFormValues): IRecipeDetail => {
  return {
    title,
    preparationTime,
    ingredients,
    directions,
    servingCount,
    lastModifiedDate: new Date().toISOString(),
    slug: getSlug(title),
    sideDish,
  };
};
