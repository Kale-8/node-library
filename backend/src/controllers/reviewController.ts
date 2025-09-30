import {Request, Response} from "express";
import {reviewService} from "../services/reviewService";

export const reviewController = {
    async list(req: Request, res: Response) {
        const reviews = await reviewService.listAll();
        res.json(reviews);
    },

    async listByBook(req: Request, res: Response) {
        const bookId = Number(req.params.bookId);
        const reviews = await reviewService.listByBook(bookId);
        res.json(reviews);
    },

    async create(req: Request, res: Response) {
        const body = req.body;
        if (!body.book_id || !body.reviewer_id || !body.rating) return res.status(400).json({message: "book_id, reviewer_id and rating required"});
        if (body.rating < 1 || body.rating > 5) return res.status(400).json({message: "rating must be 1-5"});
        const created = await reviewService.create(body);
        res.status(201).json(created);
    },

    async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        const ok = await reviewService.remove(id);
        if (!ok) return res.status(404).json({message: "Review not found"});
        res.json({message: "deleted"});
    }
};