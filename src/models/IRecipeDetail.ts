import IIngredient from './IIngredient';

interface IRecipeDetail {
  readonly _id?: string;
  title: string;
  lastModifiedDate?: string;
  preparationTime: number;
  slug?: string;
  servingCount?: number;
  directions?: string;
  ingredients?: IIngredient[];
  sideDish?: string;
}

export default IRecipeDetail;
