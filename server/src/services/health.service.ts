import { prisma } from "../config/prisma";

export const checkDatabase = async () => {
    const databaseUrl = process.env.DATABASE_URL;

    let host = "missing";

    if (databaseUrl) {
        try {
            host = new URL(databaseUrl).hostname;
        } catch {
            host = "invalid-url";
        }
    }

    await prisma.$queryRaw`SELECT 1`;

    return {
        status: "ok",
        database: "connected",
        host,
    };
};