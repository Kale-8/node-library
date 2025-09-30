import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/db";

interface SubAttrs {
    id: number;
    user_id: number;
    plan_id: number;
    start_date: Date;
    end_date?: Date | null;
    status: string;
}

type SubCreate = Optional<SubAttrs, "id" | "end_date" | "status">;

export class Subscription extends Model<SubAttrs, SubCreate> implements SubAttrs {
    public id!: number;
    public user_id!: number;
    public plan_id!: number;
    public start_date!: Date;
    public end_date?: Date | null;
    public status!: string;
}

Subscription.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'users', key: 'id'}},
    plan_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'plans', key: 'id'}},
    start_date: {type: DataTypes.DATEONLY, allowNull: false},
    end_date: {type: DataTypes.DATEONLY},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: "active"}
}, {
    sequelize,
    tableName: "subscriptions",
    timestamps: false
});