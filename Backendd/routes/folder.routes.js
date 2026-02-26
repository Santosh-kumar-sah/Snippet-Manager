import { Router } from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import {
  createFolder,
  getMyFolders,
  updateFolder,
  deleteFolder
} from "../controllers/folder.controllers.js";

const router = Router();


/**
 * @swagger
 * /api/v1/folders:
 *   post:
 *     summary: Create folder
 *     tags: [Folders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Folder created
 */
router.post("/", protect, createFolder);

/**
 * @swagger
 * /api/v1/folders:
 *   get:
 *     summary: Get user folders
 *     tags: [Folders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of folders
 */
router.get("/", protect, getMyFolders);
router.put("/:id", protect, updateFolder);
router.delete("/:id", protect, deleteFolder);

export { router  };
