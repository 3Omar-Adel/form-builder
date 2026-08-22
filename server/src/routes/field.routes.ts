import { Router } from "express";

import {
  create,
  update,
  remove,
  reorder,
} from "../controllers/field.controller";

import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";

import {
  createFieldSchema,
  updateFieldSchema,
  reorderFieldsSchema,
} from "../schemas/field.schema";

const router = Router();

router.post(
  "/:formId/fields",
  authenticate,
  validate(createFieldSchema),
  create
);

router.put(
  "/:formId/fields/reorder",
  authenticate,
  validate(reorderFieldsSchema),
  reorder
);

router.patch(
  "/:formId/fields/:fieldId",
  authenticate,
  validate(updateFieldSchema),
  update
);

router.delete(
  "/:formId/fields/:fieldId",
  authenticate,
  remove
);

export default router;