import { prisma } from "../config/prisma";

export const checkDatabase = async () => {
  await prisma.$queryRaw`SELECT 1`;

  return {
    status: "ok",
    database: "connected",
  };
};