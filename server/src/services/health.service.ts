import { prisma } from "../config/prisma";

export const checkDatabase = async () => {
    const databaseUrl = process.env.DATABASE_URL;

    console.log("DATABASE_URL exists:", Boolean(databaseUrl));
    console.log(
        "DATABASE_URL starts with postgres:",
        databaseUrl?.startsWith("postgres")
    );

    await prisma.$queryRaw`SELECT 1`;

    return {
        status: "ok",
        database: "connected",
    };
};