import { Router } from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import { isSnippetOwnerOrAdmin } from "../middlewares/snippetOwner.middlewares.js";
import {
    createSnippet,
  updateSnippet,
  deleteSnippet,
    getMySnippets,
    getPublicSnippets
} from "../controllers/snippet.controllers.js";

import { snippetQueryValidation } from "../validators/snippetQuery.validator.js";
import {validateRequest} from "../middlewares/validateRequest.middlewares.js";
import { restoreSnippet } from "../controllers/snippet.controllers.js";




const router = Router();




/**
 * @swagger
 * /api/v1/snippets:
 *   post:
 *     summary: Create a snippet
 *     tags: [Snippets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Snippet created
 */
router.post("/", protect, createSnippet);

/**
 * @swagger
 * /api/v1/snippets:
 *   get:
 *     summary: Get user snippets
 *     tags: [Snippets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of snippets
 */
router.get("/me", protect,snippetQueryValidation,validateRequest, getMySnippets);
router.get("/public",snippetQueryValidation,validateRequest, getPublicSnippets);



/**
 * @swagger
 * /api/v1/snippets/{id}:
 *   put:
 *     summary: Update a snippet
 *     tags: [Snippets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Snippet updated
 */
router.put("/:id", protect, isSnippetOwnerOrAdmin, updateSnippet);



/**
 * @swagger
 * /api/v1/snippets/{id}:
 *   delete:
 *     summary: Delete a snippet
 *     tags: [Snippets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Snippet deleted
 */
router.delete("/:id", protect, isSnippetOwnerOrAdmin, deleteSnippet);


router.patch(
  "/:id/restore",
  protect,
  isSnippetOwnerOrAdmin,
  restoreSnippet
);


export { router };
