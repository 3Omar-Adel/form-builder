import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../generated/prisma/client";

console.log(
    "DATABASE HOST:",
    process.env.DATABASE_URL
        ?.split("@")[1]
        ?.split("/")[0]
);

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({
    adapter,
});