import { Request, Response } from "express";
import { checkDatabase } from "../services/health.service";

export const getDatabaseHealth = async (
    req: Request,
    res: Response
) => {
    try {
        const result = await checkDatabase();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            status: "error",
            database: "disconnected",
        });
    }
};