import IIngredient from '../models/IIngredient';
import IRecipeDetail from '../models/IRecipeDetail';
import { getSlug } from './getSlug';

export const createRecipe = (
  title: string,
  preparationTime: number,
  ingredients?: IIngredient[],
  directions?: string,
  servingCount?: number,
  sideDish?: string,
): IRecipeDetail => {
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
