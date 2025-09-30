import {Loan} from "../models/Loan";
import {User} from "../models/User";
import {Book} from "../models/Book";
import {Notification} from "../models/Notification";
import {Op} from "sequelize";

export const loanService = {
    async listAll() {
        return Loan.findAll({include: [{model: Book, as: "book"}, {model: User, as: "borrower"}]});
    },

    async create(data: any) {
        return Loan.create(data);
    },

    async findOverdue() {
        const today = new Date().toISOString().slice(0, 10);
        return Loan.findAll({
            where: {
                return_date: {[Op.lt]: today},
                status: "active"
            },
            include: [{model: User, as: "borrower"}, {model: Book, as: "book"}]
        });
    },

    async markNotification(userId: number, message: string) {
        return Notification.create({user_id: userId, type: "loan_due", message});
    }
};