import { Router } from "express";

import {
    register,
    login,
    me,
    updateProfile,
} from "../controllers/auth.controller";

import { validate } from "../middleware/validate.middleware";

import { authenticate } from "../middleware/auth.middleware";

import {
    registerSchema,
    loginSchema,
    updateProfileSchema,
} from "../schemas/auth.schema";

const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    register
);

router.post(
    "/login",
    validate(loginSchema),
    login
);

router.get(
    "/me",
    authenticate,
    me
);

router.put(
    "/me",
    authenticate,
    validate(updateProfileSchema),
    updateProfile
);

export default router;