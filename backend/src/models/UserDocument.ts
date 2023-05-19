import { Model, DataTypes } from "sequelize"
import { sequelize } from "../db/config"
import User from "./User"
import { Type } from "../enums/user.enum"


class UserDocument extends Model {
    declare id: string
    declare type: string
    declare number: number
    declare image: string
    declare userId: string
}

UserDocument.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        type: {
            type: DataTypes.ENUM(Type.NID, Type.Passport),
            allowNull: false,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
            defaultValue: null,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        modelName: "UserDocument",
        timestamps: true,
        sequelize,
    }
)

export default UserDocument