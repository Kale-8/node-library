import {Request, Response} from "express";
import {bookCopyService} from "../services/bookCopyService";

export const bookCopyController = {
    async list(req: Request, res: Response) {
        const copies = await bookCopyService.listAll();
        res.json(copies);
    },

    async get(req: Request, res: Response) {
        const id = Number(req.params.id);
        const copy = await bookCopyService.getById(id);
        if (!copy) return res.status(404).json({message: "Copy not found"});
        res.json(copy);
    },

    async create(req: Request, res: Response) {
        const body = req.body;
        if (!body.book_id) return res.status(400).json({message: "book_id required"});
        const created = await bookCopyService.create(body);
        res.status(201).json(created);
    },

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const updated = await bookCopyService.update(id, req.body);
        if (!updated) return res.status(404).json({message: "Copy not found"});
        res.json(updated);
    },

    async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        const ok = await bookCopyService.remove(id);
        if (!ok) return res.status(404).json({message: "Copy not found"});
        res.json({message: "deleted"});
    }
};