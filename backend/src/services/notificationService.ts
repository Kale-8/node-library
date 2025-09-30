import {Notification} from "../models";

export const notificationService = {
    async listByUser(userId: number) {
        return Notification.findAll({where: {user_id: userId}});
    },

    async create(data: { user_id: number; type?: string; message: string }) {
        return Notification.create({
            user_id: data.user_id,
            type: data.type || "general",
            message: data.message,
            read: false
        });
    },

    async markRead(id: number) {
        const noti = await Notification.findByPk(id);
        if (!noti) return null;
        await noti.update({read: true});
        return noti;
    },

    async remove(id: number) {
        const n = await Notification.findByPk(id);
        if (!n) return false;
        await n.destroy();
        return true;
    }
};