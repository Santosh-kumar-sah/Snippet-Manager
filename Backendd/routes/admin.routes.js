import { Router } from "express";
import { protect,authorize } from "../middlewares/auth.middlewares.js";
import { adminDashboard } from "../controllers/admin.controllers.js";
import { authorizeRoles } from "../middlewares/authorize.middlewares.js";

const router = Router();



/**
 * @swagger
 * /api/v1/admin/dashboard:
 *   get:
 *     summary: Get admin analytics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 */


router.get(
  "/dashboard",
  protect,
  authorize("ADMIN"),
  adminDashboard
);

export {router as adminRoutes};