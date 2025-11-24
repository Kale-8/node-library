import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/db";

interface NotiAttrs {
    id: number;
    user_id: number;
    type?: string | null;
    message?: string | null;
    read?: boolean;
}

type NotiCreate = Optional<NotiAttrs, "id" | "type" | "message" | "read">;

export class Notification extends Model<NotiAttrs, NotiCreate> implements NotiAttrs {
    public id!: number;
    public user_id!: number;
    public type?: string | null;
    public message?: string | null;
    public read?: boolean;
}

Notification.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'users', key: 'id'}},
    type: {type: DataTypes.STRING},
    message: {type: DataTypes.TEXT},
    read: {type: DataTypes.BOOLEAN, defaultValue: false}
}, {
    sequelize,
    tableName: 'notifications',
    timestamps: false
});