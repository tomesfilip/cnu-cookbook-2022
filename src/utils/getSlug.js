// parses the title to slug
export const getSlug = (title) => {
  return title
    .replaceAll(' ', '-')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};
