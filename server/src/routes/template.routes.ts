import { Router } from "express";

import {
    getAll,
    getOne,
    save,
    update,
    remove,
} from "../controllers/template.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

/*
 * Public
 */
router.get(
    "/",
    getAll
);

router.get(
    "/:id",
    getOne
);

/*
 * Authenticated
 */
router.post(
    "/:id/save",
    authenticate,
    save
);

router.patch(
    "/:id",
    authenticate,
    update
);

router.delete(
    "/:id",
    authenticate,
    remove
);

export default router;