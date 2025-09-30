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
        if (!body.user_id || !body.message) return res.status(400).json({message: "user_id and message required"});
        const created = await notificationService.create(body);
        res.status(201).json(created);
    },

    async markRead(req: Request, res: Response) {
        const id = Number(req.params.id);
        const updated = await notificationService.markRead(id);
        if (!updated) return res.status(404).json({message: "Notification not found"});
        res.json(updated);
    },

    async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        const ok = await notificationService.remove(id);
        if (!ok) return res.status(404).json({message: "Notification not found"});
        res.json({message: "deleted"});
    }
};