export const getAmount = (
  amount: number,
  servingCountOriginal: number = 1,
  servingCountTemp: number,
): number => {
  if (!servingCountTemp) return amount;
  return amount * (servingCountTemp / servingCountOriginal);
};
