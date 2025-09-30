import {Request, Response, NextFunction} from "express";
import {z} from "zod";

export const bookSchema = z.object({
    title: z.string().min(1, "title required"),
    author: z.string().min(1, "author required"),
    isbn: z.string().optional(),
    genre: z.string().optional(),
    language: z.string().optional(),
    cover_url: z.string().optional(),
    description: z.string().optional(),
    owner_id: z.number().optional()
});

export const dueDateSchema = z.object({
    return_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "return_date must be YYYY-MM-DD")
});

export function validateBook(req: Request, res: Response, next: NextFunction) {
    const result = bookSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({errors: result.error.flatten()});
    }
    next();
}

export function validateDueDate(req: Request, res: Response, next: NextFunction) {
    const result = dueDateSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({errors: result.error.flatten()});
    next();
}