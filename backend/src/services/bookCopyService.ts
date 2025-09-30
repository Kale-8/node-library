import {BookCopy} from "../models";

export const bookCopyService = {
    async listAll() {
        return BookCopy.findAll();
    },

    async getById(id: number) {
        return BookCopy.findByPk(id);
    },

    async create(data: { book_id: number; condition?: string; availability_status?: string }) {
        return BookCopy.create({
            book_id: data.book_id,
            condition: data.condition || "good",
            availability_status: data.availability_status || "available"
        });
    },

    async update(id: number, data: Partial<{ condition: string; availability_status: string }>) {
        const copy = await BookCopy.findByPk(id);
        if (!copy) return null;
        await copy.update(data as any);
        return copy;
    },

    async remove(id: number) {
        const copy = await BookCopy.findByPk(id);
        if (!copy) return false;
        await copy.destroy();
        return true;
    }
};