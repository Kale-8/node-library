import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/db";

interface BCAttrs {
    id: number;
    book_id: number;
    condition: string;
    availability_status: string;
}

type BCCreate = Optional<BCAttrs, "id">;

export class BookCopy extends Model<BCAttrs, BCCreate> implements BCAttrs {
    public id!: number;
    public book_id!: number;
    public condition!: string;
    public availability_status!: string;
}

BookCopy.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    book_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'books', key: 'id'}},
    condition: {type: DataTypes.STRING, defaultValue: 'good'},
    availability_status: {type: DataTypes.STRING, defaultValue: 'available'}
}, {
    sequelize,
    tableName: 'book_copies',
    timestamps: false
});