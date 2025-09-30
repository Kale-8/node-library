import {Request, Response} from "express";
import {subscriptionService} from "../services/subscriptionService";

export const subscriptionController = {
    async list(req: Request, res: Response) {
        const subs = await subscriptionService.listAll();
        res.json(subs);
    },

    async get(req: Request, res: Response) {
        const id = Number(req.params.id);
        const sub = await subscriptionService.getById(id);
        if (!sub) return res.status(404).json({message: "Subscription not found"});
        res.json(sub);
    },

    async create(req: Request, res: Response) {
        const body = req.body;
        if (!body.user_id || !body.plan_id || !body.start_date) return res.status(400).json({message: "user_id, plan_id and start_date required"});
        const created = await subscriptionService.create(body);
        res.status(201).json(created);
    },

    async getByUser(req: Request, res: Response) {
        const userId = Number(req.params.userId);
        const subs = await subscriptionService.getByUser(userId);
        res.json(subs);
    },

    async cancel(req: Request, res: Response) {
        const id = Number(req.params.id);
        const canceled = await subscriptionService.cancel(id);
        if (!canceled) return res.status(404).json({message: "Subscription not found"});
        res.json(canceled);
    },

    async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        const ok = await subscriptionService.remove(id);
        if (!ok) return res.status(404).json({message: "Subscription not found"});
        res.json({message: "deleted"});
    }
};