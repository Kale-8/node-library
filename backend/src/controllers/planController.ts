import {Request, Response} from "express";
import {planService} from "../services/planService";

export const planController = {
    async list(req: Request, res: Response) {
        const plans = await planService.listAll();
        res.json(plans);
    },

    async get(req: Request, res: Response) {
        const id = Number(req.params.id);
        const plan = await planService.getById(id);
        if (!plan) return res.status(404).json({message: "Plan not found"});
        res.json(plan);
    },

    async create(req: Request, res: Response) {
        const body = req.body;
        if (!body.name || body.price == null) return res.status(400).json({message: "name and price required"});
        const created = await planService.create(body);
        res.status(201).json(created);
    },

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const updated = await planService.update(id, req.body);
        if (!updated) return res.status(404).json({message: "Plan not found"});
        res.json(updated);
    },

    async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        const ok = await planService.remove(id);
        if (!ok) return res.status(404).json({message: "Plan not found"});
        res.json({message: "deleted"});
    }
};