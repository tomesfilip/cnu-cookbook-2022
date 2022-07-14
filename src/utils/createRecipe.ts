import { getSlug } from './getSlug';

export const createRecipe = (
  directions,
  ingredients,
  title,
  preparationTime,
  servingCount,
  sideDish,
  imageURI,
) => {
  return {
    directions,
    ingredients,
    lastModifiedDate: new Date().toISOString(),
    title,
    preparationTime,
    servingCount,
    slug: getSlug(title),
    sideDish,
    imageURI,
  };
};