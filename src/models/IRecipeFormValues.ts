import IIngredient from './IIngredient';

interface IRecipeFormValues {
  title: string;
  preparationTime: number;
  directions: string;
  ingredients?: IIngredient[];
  servingCount?: number;
  sideDish?: string;
}

export default IRecipeFormValues;
