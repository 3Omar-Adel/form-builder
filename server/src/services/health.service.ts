import { prisma } from "../config/prisma";

export const checkDatabase = async () => {
    const databaseUrl = process.env.DATABASE_URL;

    let databaseHost = "missing";

    if (databaseUrl) {
        try {
            databaseHost = new URL(databaseUrl).hostname;
        } catch {
            databaseHost = "invalid-url";
        }
    }

    console.log("DATABASE HOST:", databaseHost);

    await prisma.$queryRaw`SELECT 1`;

    return {
        status: "ok",
        database: "connected",
        host: databaseHost,
    };
};