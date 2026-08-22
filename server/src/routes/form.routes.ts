import { Router } from "express";

import {
  create,
  getMyForms,
  getOne,
  update,
  remove,
  publish,
  archive,
  unpublish,
  restore,
} from "../controllers/form.controller";

import { authenticate } from "../middleware/auth.middleware";

import { validate } from "../middleware/validate.middleware";

import {
  createFormSchema,
  updateFormSchema,
} from "../schemas/form.schema";

import {
  getResponses,
  getOneResponse,
  removeResponse,
} from "../controllers/response.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createFormSchema),
  create
);

router.get(
  "/",
  authenticate,
  getMyForms
);

router.post(
  "/:id/publish",
  authenticate,
  publish
);

router.post(
  "/:id/unpublish",
  authenticate,
  unpublish
);

router.post(
  "/:id/archive",
  authenticate,
  archive
);

router.get(
  "/:id",
  authenticate,
  getOne
);

router.patch(
  "/:id",
  authenticate,
  validate(updateFormSchema),
  update
);

router.delete(
  "/:id",
  authenticate,
  remove
);

router.post(
  "/:id/restore",
  authenticate,
  restore
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