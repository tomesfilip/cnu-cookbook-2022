import IRecipeDetail from '../models/IRecipeDetail';
import IRecipeFormValues from '../models/IRecipeFormValues';
import { getSlug } from './getSlug';

export const createRecipe = ({
  title,
  preparationTime,
  ingredients,
  directions,
  servingCount,
  sideDish,
}: IRecipeFormValues): IRecipeDetail => {
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
