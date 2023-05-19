import { Request } from "express"
import { UUID } from "sequelize";

interface UserAuth {
    userId: typeof UUID,
    token: string,
    role: string
}


export interface IRequest extends Request {
    auth?: UserAuth
}