import {Plan} from "../models";

export const planService = {
    async listAll() {
        return Plan.findAll();
    },

    async getById(id: number) {
        return Plan.findByPk(id);
    },

    async create(data: {
        name: string;
        price: number;
        billing_cycle?: string;
        max_books_per_month?: number;
        description?: string
    }) {
        return Plan.create({
            name: data.name,
            price: data.price,
            billing_cycle: data.billing_cycle || "monthly",
            max_books_per_month: data.max_books_per_month ?? 5,
            description: data.description || null
        });
    },

    async update(id: number, data: Partial<{
        name: string;
        price: number;
        billing_cycle: string;
        max_books_per_month: number;
        description: string
    }>) {
        const plan = await Plan.findByPk(id);
        if (!plan) return null;
        await plan.update(data as any);
        return plan;
    },

    async remove(id: number) {
        const plan = await Plan.findByPk(id);
        if (!plan) return false;
        await plan.destroy();
        return true;
    }
};