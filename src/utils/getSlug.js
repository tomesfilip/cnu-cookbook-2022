import { normalizeText } from './normalizeText';

// parses the title to slug
export const getSlug = (title) => {
  return normalizeText(title).replaceAll(' ', '-');
};
