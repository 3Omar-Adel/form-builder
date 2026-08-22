import { Router } from "express";
import { createResponse } from "../controllers/response.controller";

const router = Router();

router.post(
  "/:slug/responses",
  createResponse
);

export default router;