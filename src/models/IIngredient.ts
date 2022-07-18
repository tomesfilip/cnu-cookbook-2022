interface IIngredient {
  readonly _id?: string;
  name: string;
  amount: number;
  amountUnit: string;
  isGroup: boolean;
  timestamp?: number;
}

export default IIngredient;
