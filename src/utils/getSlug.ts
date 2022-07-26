import { normalizeText } from './normalizeText';

export const getSlug = (title: string): string => {
  return normalizeText(title).replaceAll(' ', '-');
};
