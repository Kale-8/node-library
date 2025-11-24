import {Review} from "../models";

export const reviewService = {
    async listAll() {
        return Review.findAll();
    },

    async listByBook(bookId: number) {
        return Review.findAll({where: {book_id: bookId}});
    },

    async create(data: { book_id: number; reviewer_id: number; rating: number; comment?: string }) {
        return Review.create({
            book_id: data.book_id,
            reviewer_id: data.reviewer_id,
            rating: data.rating,
            comment: data.comment || null
        });
    },

    async remove(id: number) {
        const r = await Review.findByPk(id);
        if (!r) return false;
        await r.destroy();
        return true;
    }
};