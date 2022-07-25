export const getNormalizedDirections = (directions: string): string => {
  return directions.replace(/\n\n/g, '\n').trim();
};
