import { getSlug } from './getSlug';

export const createRecipe = (
  directions,
  ingredients,
  title,
  preparationTime,
  servingCount,
  sideDish,
  _id = null,
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
    _id,
  };
};
