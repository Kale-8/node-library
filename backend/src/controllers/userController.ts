import {Request, Response} from "express";
import {userService} from "../services/userService";

export const userController = {
    async list(req: Request, res: Response) {
        const users = await userService.listAll();
        res.json(users);
    },

    async get(req: Request, res: Response) {
        const id = Number(req.params.id);
        const user = await userService.getById(id);
        if (!user) throw {status: 404, message: "Not found"};
        res.json(user);
    },

    async create(req: Request, res: Response) {
        const body = req.body;
        if (!body.email || !body.password || !body.name || !body.last_name)
            throw {status: 400, message: "name, last_name, email and password are required"};
        const exists = await userService.findByEmail(body.email);
        if (exists) throw {status: 409, message: "Email already exists"};
        const created = await userService.create(body);
        res.status(201).json(created);
    },

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const updated = await userService.update(id, req.body);
        if (!updated) throw {status: 404, message: "Not found"};
        res.json(updated);
    },

    async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        const ok = await userService.remove(id);
        if (!ok) throw {status: 404, message: "Not found"};
        res.json({message: "deleted"});
    }
};