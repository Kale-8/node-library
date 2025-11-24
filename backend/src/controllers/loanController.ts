import {Request, Response} from "express";
import {loanService} from "../services/loanService";

export const loanController = {
    async list(req: Request, res: Response) {
        const loans = await loanService.listAll();
        res.json(loans);
    },

    async create(req: Request, res: Response) {
        const data = req.body;
        const loan = await loanService.create(data);
        res.status(201).json(loan);
    }
};