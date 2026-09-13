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

    return {
        databaseUrlExists: Boolean(databaseUrl),
        host,
    };
};