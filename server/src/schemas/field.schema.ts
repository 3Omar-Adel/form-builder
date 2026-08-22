import { z } from "zod";

const fieldTypeSchema = z.enum([
  "TEXT",
  "EMAIL",
  "NUMBER",
  "TEXTAREA",
  "SELECT",
  "RADIO",
  "CHECKBOX",
  "DATE",
]);

const optionSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Option label is required")
    .max(100),

  value: z
    .string()
    .trim()
    .min(1, "Option value is required")
    .max(100),

  position: z.number().int().nonnegative(),
});

export const createFieldSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Field label is required")
    .max(200),

  type: fieldTypeSchema,

  required: z.boolean().optional(),

  position: z
    .number()
    .int()
    .nonnegative()
    .optional(),

  options: z.array(optionSchema).optional(),
});

export const updateFieldSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .optional(),

  required: z.boolean().optional(),

  options: z.array(optionSchema).optional(),
});


export const reorderFieldsSchema = z.object({
  fields: z
    .array(
      z.object({
        id: z.string().min(1),
        position: z.number().int().nonnegative(),
      })
    )
    .min(1),
});

// cmt32t2770000nkv6l4u3auqr
// http://localhost:5000/api/forms/cmt31nw2g0000c4v6am0mvpuv/fields/reorder
