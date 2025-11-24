import {Book} from "../models";

export const bookService = {
    async listAll() {
        return Book.findAll();
    },

    async getById(id: number) {
        return Book.findByPk(id);
    },

    async create(data: any) {
        return Book.create(data);
    },

    async update(id: number, data: any) {
        const book = await Book.findByPk(id);
        if (!book) return null;
        return book.update(data);
    },

    async remove(id: number) {
        const book = await Book.findByPk(id);
        if (!book) return false;
        await book.destroy();
        return true;
    }
};