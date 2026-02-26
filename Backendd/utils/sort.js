

const ALLOWED_SORT_FIELDS = [
  "createdAt",
  "updatedAt",
  "title",
  "codeLanguage"
];

const getSortObject = (sortBy, order) => {
  if (!ALLOWED_SORT_FIELDS.includes(sortBy)) {
    sortBy = "createdAt";
  }

  const sortOrder = order === "asc" ? 1 : -1;

  return { [sortBy]: sortOrder };
};

export {
  getSortObject,
  ALLOWED_SORT_FIELDS
};
