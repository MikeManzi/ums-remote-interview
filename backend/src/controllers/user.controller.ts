import { Request, Response } from "express"
import { IRequest } from "../utils/types"
import { generateResetToken, hashPassword } from "../utils/passwords"
import Paginator from "../utils/pagination"
import User from "../models/User"
import { Status } from "../enums/user.enum"
import UserDocument from "../models/UserDocument"
import { API_RESPONSE } from "../utils/response"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { sendResetPasswordEmail, sendOneTimePassword } from "../utils/email"
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { getImageUrl } from "../utils/images"

export const getAllUsers = async (req: Request, res: Response) => {
    const page = parseInt((String(req.query.page ? req.query.page : 1))) || 1
    const perPage = parseInt((String(req.query.perPage ? req.query.perPage : 10))) || 10
    const paginator = new Paginator(User)

    const results = await paginator.paginate({}, page, perPage)

    return API_RESPONSE(res, {
        success: true,
        message: "Successfully retrieved all users",
        status: 200,
        data: results
    })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadFolder = '';

        if (req.originalUrl.includes('/new')) {
            uploadFolder = 'uploads/profiles';
        } else if (req.originalUrl.includes('/request-verification')) {
            uploadFolder = 'uploads/documents';
        } else {
            uploadFolder = 'uploads/other';
        }

        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
        }

        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});


const upload = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a picture'));
        }
        return cb(null, true);
    },
});


export const createUser = async (req: Request, res: Response) => {

    const { email, firstName, lastName, gender, dateOfBirth, maritalStatus, nationality, status } = req.body
    const profile = req.file!.filename;
    try {
        const userExists: User | null = await findUserByEmail(email)

        if (userExists) {
            return API_RESPONSE(res, {
                success: false,
                message: "Email already in use",
                status: 400,
            })
        }
        const hashedPassword = await hashPassword(req.body.password)
        const newUser = await User.create({
            email,
            firstName,
            lastName,
            gender,
            dateOfBirth,
            maritalStatus,
            nationality,
            profile,
            status,
            password: hashedPassword,
        });


        const { password, ...rest } = newUser.toJSON()

        return API_RESPONSE(res, {
            success: true,
            message: "User created successfully",
            data: rest,
            status: 201,
        })
    } catch (error: any) {
        console.log("The error in creating a user: ", error)
        return API_RESPONSE(res, {
            success: false,
            message: "Internal server error",
            status: 500,
            err: error.message,
        })
    }
}

const findUserByEmail = async (email: any) => {
    try {
        const user: User | null = await User.findOne({
            where: {
                email: email,
            },
        })
        return user
    } catch (error) {
        return null
    }
}

const findUserById = async (id: any) => {
    try {
        const user: User | null = await User.findOne({
            where: {
                id,
            },
        })
        return user

    } catch (error) {
        return null
    }
}

const findUserByOTP = async (otp: any) => {
    try {
        const user: User | null = await User.findOne({
            where: {
                otp,
            },
        })
        return user

    } catch (error) {
        return null
    }
}

export const signIn = async (req: Request, res: Response) => {

    try {
        const data = await findUserByEmail(req.body.email)
        if (!data) {
            return API_RESPONSE(res, {
                success: true,
                message: "User not found",
                status: 404,
            })
        }
        const user = data.dataValues

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid) {
            return API_RESPONSE(res, {
                success: false,
                message: "Invalid password",
                status: 401,
            })
        }

        const otp = Math.random().toString(36).substring(2, 8);

        await User.update({
            otp,
        }, {
            where: { id: user.id },
        });

        sendOneTimePassword(user.email, otp)

        return API_RESPONSE(res, {
            success: true,
            message: "OTP sent successfully",
            status: 200,
        })

    } catch (error: any) {
        return API_RESPONSE(res, {
            success: false,
            message: "Internal server error",
            status: 500,
            err: error.message,
        })
    }
}

export const verifyOTP = async (req: Request, res: Response) => {
    try {
        const { code } = req.body;

        const user = await findUserByOTP(code);
        
        if (!user) {
            return API_RESPONSE(res, {
                success: false,
                message: "Invalid OTP",
                status: 400,
            });
        }

        const token = jwt.sign(
            { userId: user.dataValues.id, role: user.dataValues.role },
            String(process.env.AUTH_KEY),
            {
                expiresIn: '24h'
            }
        );

        await User.update({ otp: null }, { where: { id: user.dataValues.id} });

        const { password, resetPasswordToken, resetPasswordExpires, otp,...rest } = user.dataValues

        return API_RESPONSE(res, {
            success: true,
            message: "OTP verified successfully",
            data: { user: rest, accessToken: token },
            status: 200,
        });
    } catch (error: any) {
        return API_RESPONSE(res, {
            success: false,
            message: "Failed to verify OTP",
            status: 500,
            err: error.message,
        });
    }
};

export const resetPasswordEmail = async (req: Request, res: Response) => {
    const { email } = req.body

    try {
        const user = await findUserByEmail(email)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const { resetToken, resetTokenExpiration } = generateResetToken()

        await User.update({
            resetPasswordToken: resetToken,
            resetPasswordExpires: resetTokenExpiration
        }, {
            where: { id: user.dataValues.id }
        })
        sendResetPasswordEmail(email, resetToken)

        return API_RESPONSE(res, {
            success: true,
            message: "Reset Password email was sent",
            status: 200,
        })
    } catch (error: any) {
        return API_RESPONSE(res, {
            success: true,
            message: "Failed to send email",
            status: 500,
            err: error.message,
        })
    }
}

const findUserByResetToken = async (token: string) => {
    try {
        const user: User | null = await User.findOne({
            where: {
                resetPasswordToken: token,
            },
        })
        return user
    } catch (error) {
        return null
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const resetToken = req.params.resetToken
    const { password } = req.body

    try {
        const user = await findUserByResetToken(resetToken)
        if (!user) {
            return API_RESPONSE(res, {
                success: true,
                message: "Invalid token",
                status: 404,
            })
        }

        const expirationDate = user.dataValues.resetPasswordExpires

        if (expirationDate.getTime() < Date.now()) {
            return API_RESPONSE(res, {
                success: true,
                message: "Expired token",
                status: 400,
            })
        }

        const hashedPassword = await hashPassword(password)

        await User.update({
            password: hashedPassword,
        }, {
            where: { id: user.dataValues.id }
        })

        return API_RESPONSE(res, {
            success: true,
            message: "User password was reset successfully",
            status: 200,
        })
    } catch (error: any) {
        return API_RESPONSE(res, {
            success: true,
            message: "Failed to reset the password",
            status: 500,
            err: error.message,
        })
    }
}

export const requestVerification = async (req: IRequest, res: Response) => {
    try {
        const { type, number } = req.body
        const image = req.file!.filename;
        const userId = req.auth?.userId;

        const existingRequest = await UserDocument.findOne({
            where: {
                userId,
            },
        })

        if (existingRequest) {
            return API_RESPONSE(res, {
                success: false,
                message: "Verification request already sent",
                status: 400,
            })
        }

        const newUserDocument = await UserDocument.create({
            type,
            number,
            image,
            userId
        })

        const user = await findUserById(userId)
        if (user) {
            await User.update({
                status: Status.PendingVerification,
            }, {
                where: { id: user.dataValues.id }
            })
        }

        return API_RESPONSE(res, {
            success: true,
            message: "Official document added successfully",
            data: newUserDocument,
            status: 201,
        })
    } catch (error: any) {
        return API_RESPONSE(res, {
            success: true,
            message: "Failed to send document",
            status: 500,
            err: error.message,
        })

    }
}

export const viewVerificationRequest = async (req: Request, res: Response) => {
    try {
        const request = await UserDocument.findOne({
            where: {
                id: req.params.id,
            },
        })

        if (!request) {
            return API_RESPONSE(res, {
                success: false,
                message: "Request not found",
                status: 404,
            })
        }

        const { type, number, image, userId } = request;

        const imageUrl = getImageUrl(image, req);

        const responseData = {
            type,
            number,
            userId,
            image: imageUrl,
        };
        return API_RESPONSE(res, {
            success: true,
            message: "Verification request retrieved successfully",
            data: responseData,
            status: 200,
        });
    } catch (error: any) {
        return API_RESPONSE(res, {
            success: true,
            message: "Failed to retrieve request",
            status: 500,
            err: error.message,
        })

    }
}


export const verifyAccount = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id

        const user = await findUserById(userId)

        if (!user) {
            return API_RESPONSE(res, {
                success: false,
                message: "User not found",
                status: 404,
            })
        }

        if (user.dataValues.status === Status.Verified) {
            return API_RESPONSE(res, {
                success: false,
                message: "Account already verified",
                status: 404,
            })
        }

        await User.update({
            status: Status.Verified,
        }, {
            where: { id: user.dataValues.id }
        })
        return API_RESPONSE(res, {
            success: true,
            message: "User verified successfully",
            data: user,
            status: 200,
        })
    } catch (error: any) {
        return API_RESPONSE(res, {
            success: true,
            message: "Failed to verify account",
            status: 500,
            err: error.message,
        })

    }
}

export const getUserProfile = async (req: IRequest, res: Response) => {
    const userId = req.auth?.userId;

    try {
        if (!userId) {
            return API_RESPONSE(res, {
                success: false,
                message: "User ID not provided",
                status: 400,
            });
        }

        const data = await findUserById(userId);
        const user = data?.dataValues

        if (!user) {
            return API_RESPONSE(res, {
                success: false,
                message: "User not found",
                status: 404,
            });
        }

        const { email, firstName, lastName, gender, dateOfBirth, maritalStatus, nationality, status, profile } = user;

        const profileImageUrl = getImageUrl(profile, req);

        const responseData = {
            email,
            firstName,
            lastName,
            gender,
            dateOfBirth,
            maritalStatus,
            nationality,
            status,
            profile: profileImageUrl,
        };
        return API_RESPONSE(res, {
            success: true,
            message: "User profile retrieved successfully",
            data: responseData,
            status: 200,
        });
    } catch (error: any) {
        return API_RESPONSE(res, {
            success: false,
            message: "Internal server error",
            status: 500,
            err: error.message,
        });
    }
};

export const uploadImage = upload.single('image');