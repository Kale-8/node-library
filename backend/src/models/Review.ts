import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/db";

interface RevAttrs {
    id: number;
    book_id: number;
    reviewer_id: number;
    rating: number;
    comment?: string | null;
}

type RevCreate = Optional<RevAttrs, "id" | "comment">;

export class Review extends Model<RevAttrs, RevCreate> implements RevAttrs {
    public id!: number;
    public book_id!: number;
    public reviewer_id!: number;
    public rating!: number;
    public comment?: string | null;
}

Review.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    book_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'books', key: 'id'}},
    reviewer_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'users', key: 'id'}},
    rating: {type: DataTypes.SMALLINT, allowNull: false, validate: {min: 1, max: 5}},
    comment: {type: DataTypes.TEXT}
}, {
    sequelize,
    tableName: 'reviews',
    timestamps: false
});