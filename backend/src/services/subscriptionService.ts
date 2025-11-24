import {Subscription} from "../models";

export const subscriptionService = {
    async listAll() {
        return Subscription.findAll();
    },

    async getById(id: number) {
        return Subscription.findByPk(id);
    },

    async create(data: {
        user_id: number;
        plan_id: number;
        start_date: Date;
        end_date?: Date;
        status?: string
    }) {
        return Subscription.create({
            user_id: data.user_id,
            plan_id: data.plan_id,
            start_date: data.start_date,
            end_date: data.end_date || null,
            status: data.status || "active"
        });
    },

    async getByUser(userId: number) {
        return Subscription.findAll({where: {user_id: userId}});
    },

    async cancel(id: number) {
        const sub = await Subscription.findByPk(id);
        if (!sub) return null;
        await sub.update({status: "canceled"});
        return sub;
    },

    async remove(id: number) {
        const sub = await Subscription.findByPk(id);
        if (!sub) return false;
        await sub.destroy();
        return true;
    }
};