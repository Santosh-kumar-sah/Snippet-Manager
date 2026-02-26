import express from "express";
import cors from "cors";
import { ApiError } from "./utils/apiError.js";

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true  
}))

app.use(cors());
app.use(express.json());

import contactRoutes from "./routes/contact.routes.js";

app.use("/api/v1/contact", contactRoutes);


import { router as authRoutes } from "./routes/auth.routes.js";
app.use("/api/v1/auth", authRoutes);

import {adminRoutes} from "./routes/admin.routes.js";
app.use("/api/v1/admin", adminRoutes);


import {router as snippetRoutes} from "./routes/snippet.routes.js";

app.use("/api/v1/snippets", snippetRoutes);

import { router as folderRoutes } from "./routes/folder.routes.js";
app.use("/api/v1/folders", folderRoutes);


import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "./config/swagger.js";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));






app.use((err, req, res, next) => {
  
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(
    new ApiError(500, err.message || "Internal Server Error")
  );
});

export { app};

