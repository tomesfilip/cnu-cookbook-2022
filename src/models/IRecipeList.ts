interface IRecipeList {
  _id: string;
  title: string;
  preparationTime: number;
  slug: string;
  lastModifiedDate: string;
  sideDish?: string;
}

export default IRecipeList;
