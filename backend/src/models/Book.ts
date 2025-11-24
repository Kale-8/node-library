import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/db";

interface BookAttrs {
    id: number;
    title: string;
    author: string;
    isbn?: string | null;
    genre?: string | null;
    language?: string | null;
    cover_url?: string | null;
    description?: string | null;
    owner_id?: number | null;
    status?: string;
    created_at?: Date;
    updated_at?: Date;
}

type BookCreate = Optional<BookAttrs, "id" | "isbn" | "genre" | "language" | "cover_url" | "description" | "owner_id" | "status" | "created_at" | "updated_at">;

export class Book extends Model<BookAttrs, BookCreate> implements BookAttrs {
    public id!: number;
    public title!: string;
    public author!: string;
    public isbn?: string | null;
    public genre?: string | null;
    public language?: string | null;
    public cover_url?: string | null;
    public description?: string | null;
    public owner_id?: number | null;
    public status?: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Book.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    author: {type: DataTypes.STRING, allowNull: false},
    isbn: {type: DataTypes.STRING},
    genre: {type: DataTypes.STRING},
    language: {type: DataTypes.STRING},
    cover_url: {type: DataTypes.TEXT},
    description: {type: DataTypes.TEXT},
    owner_id: {type: DataTypes.INTEGER, references: {model: 'users', key: 'id'}},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: 'available'},
    created_at: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    updated_at: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
}, {
    sequelize,
    tableName: 'books',
    timestamps: false
});