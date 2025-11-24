import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/db";

interface PlanAttributes {
    id: number;
    name: string;
    price: number;
    billing_cycle: string;
    max_books_per_month: number;
    description?: string | null;
}

type PlanCreation = Optional<PlanAttributes, "id" | "description">;

export class Plan extends Model<PlanAttributes, PlanCreation> implements PlanAttributes {
    public id!: number;
    public name!: string;
    public price!: number;
    public billing_cycle!: string;
    public max_books_per_month!: number;
    public description?: string | null;
}

Plan.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    billing_cycle: {type: DataTypes.STRING, allowNull: false, defaultValue: "monthly"},
    max_books_per_month: {type: DataTypes.INTEGER, defaultValue: 5},
    description: {type: DataTypes.TEXT}
}, {
    sequelize,
    tableName: "plans",
    timestamps: false
});