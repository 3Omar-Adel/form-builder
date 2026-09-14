import { Router } from "express";

import {
    createResponse,
    getResponses,
    getOneResponse,
    removeResponse,
} from "../controllers/response.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post(
    "/:slug/responses",
    createResponse
);

router.get(
    "/:id/responses",
    authenticate,
    getResponses
);

router.get(
    "/:id/responses/:responseId",
    authenticate,
    getOneResponse
);

router.delete(
    "/:id/responses/:responseId",
    authenticate,
    removeResponse
);

export default router;