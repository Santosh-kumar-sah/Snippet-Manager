import { query } from "express-validator";

 const snippetQueryValidation = [
 
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be between 1 and 100"),

  query("sortBy")
    .optional()
    .isIn(["createdAt", "updatedAt", "title", "codeLanguage"])
    .withMessage("Invalid sort field"),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("order must be asc or desc"),

  query("isPublic")
    .optional()
    .isBoolean()
    .withMessage("isPublic must be true or false"),

  query("codeLanguage")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("codeLanguage cannot be empty"),

  query("tags")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("tags cannot be empty"),
];

export { snippetQueryValidation };