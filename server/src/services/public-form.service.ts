import { prisma } from "../config/prisma";
import { ApiError } from "../utils/api-error";

export const getPublicFormBySlug = async (slug: string) => {
  const form = await prisma.form.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      title: true,
      description: true,
      slug: true,
      status: true,
      fields: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          label: true,
          type: true,
          required: true,
          position: true,
          options: {
            orderBy: {
              position: "asc",
            },
            select: {
              id: true,
              label: true,
              value: true,
              position: true,
            },
          },
        },
      },
    },
  });

  if (!form) {
    throw new ApiError(
      "Published form not found",
      404
    );
  }

  return form;
};