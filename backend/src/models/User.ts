import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/db";

interface UserAttributes {
    id: number;
    name: string;
    last_name: string;
    email: string;
    password_hash: string;
    phone?: string | null;
    address?: string | null;
    role: string;
    created_at?: Date;
    updated_at?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "phone" | "address" | "created_at" | "updated_at">;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public last_name!: string;
    public email!: string;
    public password_hash!: string;
    public phone?: string | null;
    public address?: string | null;
    public role!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

User.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    last_name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password_hash: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: true},
    address: {type: DataTypes.TEXT, allowNull: true},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: "user"},
    created_at: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    updated_at: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
}, {
    sequelize,
    tableName: "users",
    timestamps: false
});