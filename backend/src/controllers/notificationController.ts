import {Request, Response} from "express";
import {notificationService} from "../services/notificationService";

export const notificationController = {
    async listByUser(req: Request, res: Response) {
        const userId = Number(req.params.userId);
        const notes = await notificationService.listByUser(userId);
        res.json(notes);
    },

    async create(req: Request, res: Response) {
        const body = req.body;
        if (!body.user_id || !body.message) throw {status: 400, message: "user_id and message required"};
        const created = await notificationService.create(body);
        res.status(201).json(created);
    },

    async markRead(req: Request, res: Response) {
        const id = Number(req.params.id);
        const updated = await notificationService.markRead(id);
        if (!updated) throw {status: 404, message: "Not found"};
        res.json(updated);
    },

    async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        const ok = await notificationService.remove(id);
        if (!ok) throw {status: 404, message: "Not found"};
        res.json({message: "deleted"});
    }
};