export const getNormalizedPrepTime = (prepTimeMinutes) => {
  const hours = Math.floor(prepTimeMinutes / 60)
    ? Math.floor(prepTimeMinutes / 60).toString() + 'h'
    : '';
  const minutes =
    prepTimeMinutes % 60 ? (prepTimeMinutes % 60).toString() + 'min' : '';
  return `${hours} ${minutes}`.trim();
};
