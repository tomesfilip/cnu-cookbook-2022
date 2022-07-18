import { normalizeText } from './normalizeText';

// parses the title to slug
export const getSlug = (title: string): string => {
  return normalizeText(title).replaceAll(' ', '-');
};
