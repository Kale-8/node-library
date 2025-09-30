import {Request, Response, NextFunction} from "express";
import logger from "../utils/logger";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const now = new Date().toISOString();
    logger.info(`[${now}] ${req.method} ${req.originalUrl}`);
    next();
}