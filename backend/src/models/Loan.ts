import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/db";

interface LoanAttrs {
    id: number;
    book_id: number;
    borrower_id: number;
    owner_id: number;
    loan_date: Date;
    return_date: Date;
    actual_return_date?: Date | null;
    status: string;
    created_at: Date;
    updated_at: Date;
}

type LoanCreate = Optional<LoanAttrs, "id" | "actual_return_date" | "status">;

export class Loan extends Model<LoanAttrs, LoanCreate> implements LoanAttrs {
    public id!: number;
    public book_id!: number;
    public borrower_id!: number;
    public owner_id!: number;
    public loan_date!: Date;
    public return_date!: Date;
    public actual_return_date?: Date | null;
    public status!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

Loan.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    book_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'books', key: 'id'}},
    borrower_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'users', key: 'id'}},
    owner_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'users', key: 'id'}},
    loan_date: {type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW},
    return_date: {type: DataTypes.DATEONLY, allowNull: false},
    actual_return_date: {type: DataTypes.DATEONLY},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: 'active'},
    created_at: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    updated_at: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
}, {
    sequelize,
    tableName: 'loans',
    timestamps: false
});