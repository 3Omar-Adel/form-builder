import { Router } from "express";
import { getPublicForm } from "../controllers/public-form.controller";

const router = Router();

router.get(
  "/:slug",
  getPublicForm
);

export default router;