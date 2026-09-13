import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import formRoutes from "./routes/form.routes";
import fieldRoutes from "./routes/field.routes";
import publicFormRoutes from "./routes/public-form.routes";
import responseRoutes from "./routes/response.routes";
import templateRoutes from "./routes/template.routes";

import { notFoundHandler } from "./middleware/not-found.middleware";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Form Builder API is running",
  });
});
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Form Builder API is running",
    });
});

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/forms", fieldRoutes);
app.use("/api/public/forms", publicFormRoutes);
app.use("/api/public/forms", responseRoutes);

// 404 Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;