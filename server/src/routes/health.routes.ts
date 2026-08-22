import { Router } from "express";
import { getDatabaseHealth } from "../controllers/health.controller";

const router = Router();

router.get("/db", getDatabaseHealth);

export default router;