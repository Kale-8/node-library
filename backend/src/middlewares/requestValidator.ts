import {Request, Response, NextFunction} from "express";

export function requestValidator(req: Request, res: Response, next: NextFunction) {
    if (["POST", "PUT", "PATCH"].includes(req.method)) {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({error: "Request body is required"});
        }
    }
    if (req.params.id && isNaN(Number(req.params.id))) {
        return res.status(400).json({error: "Invalid ID parameter"});
    }
    next();
}