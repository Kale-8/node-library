import {Request, Response, NextFunction} from "express";
import dotenv from "dotenv";

dotenv.config();

const VALID_TOKEN = process.env.AUTH_TOKEN;

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({message: "Unauthorized - no token"});

    const parts = (header as string).split(" ");
    if (parts.length !== 2) return res.status(401).json({message: "Unauthorized - bad format"});

    const token = parts[1];
    if (token !== VALID_TOKEN) return res.status(401).json({message: "Unauthorized - invalid token"});

    next();
}