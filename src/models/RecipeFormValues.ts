import IIngredient from './IIngredient';

type RecipeFormValues = {
  title: string;
  preparationTime: number;
  directions: string;
  ingredients?: IIngredient[];
  servingCount?: number;
  sideDish?: string;
};

export default RecipeFormValues;
