import {User} from "../models";
import bcrypt from "bcrypt";

export const userService = {
    async listAll() {
        return User.findAll({attributes: {exclude: ["password_hash"]}});
    },

    async getById(id: number) {
        return User.findByPk(id, {attributes: {exclude: ["password_hash"]}});
    },

    async findByEmail(email: string) {
        return User.findOne({where: {email}});
    },

    async create(data: {
        name: string;
        last_name: string;
        email: string;
        password: string;
        phone?: string;
        address?: string;
        role?: string
    }) {
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(data.password, saltRounds);
        const created = await User.create({
            name: data.name,
            last_name: data.last_name,
            email: data.email,
            password_hash,
            phone: data.phone || null,
            address: data.address || null,
            role: data.role || "user"
        });
        const r = created.toJSON();
        delete (r as any).password_hash;
        return r;
    },

    async update(id: number, data: Partial<{
        name: string;
        last_name: string;
        email: string;
        password: string;
        phone: string;
        address: string;
        role: string
    }>) {
        const user = await User.findByPk(id);
        if (!user) return null;
        if (data.password) {
            const saltRounds = 10;
            data = {...data, password_hash: await bcrypt.hash(data.password, saltRounds)} as any;
            delete (data as any).password;
        }
        await user.update(data as any);
        const out = user.toJSON();
        delete (out as any).password_hash;
        return out;
    },

    async remove(id: number) {
        const user = await User.findByPk(id);
        if (!user) return false;
        await user.destroy();
        return true;
    }
};