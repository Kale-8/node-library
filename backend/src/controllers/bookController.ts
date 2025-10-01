import {Request, Response} from "express";
import {bookService} from "../services/bookService";

export const bookController = {
    async list(req: Request, res: Response) {
        const books = await bookService.listAll();
        res.json(books);
    },

    async get(req: Request, res: Response) {
        const id = Number(req.params.id);
        const book = await bookService.getById(id);
        if (!book) throw {status: 404, message: "Not found"};
        res.json(book);
    },

    async create(req: Request, res: Response) {
        const data = req.body;
        const created = await bookService.create(data);
        res.status(201).json(created);
    },

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const updated = await bookService.update(id, req.body);
        if (!updated) throw {status: 404, message: "Not found"};
        res.json(updated);
    },

    async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        const ok = await bookService.remove(id);
        if (!ok) throw {status: 404, message: "Not found"};
        res.json({message: "deleted"});
    }
};