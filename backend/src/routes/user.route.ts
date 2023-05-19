import express from "express"

import { 
    getAllUsers, 
    createUser, 
    signIn, 
    resetPasswordEmail, 
    resetPassword,
    requestVerification, 
    verifyAccount,
    viewVerificationRequest,
    getUserProfile,
    uploadImage,
    verifyOTP
} from "../controllers/user.controller"

import { authenticate, authorize } from "../middlewares/auth.middleware"
import { Role } from "../enums/user.enum"

const userRouter = express.Router()


userRouter.get("/", [authenticate, authorize(Role.Admin)],getAllUsers)
userRouter.post("/new", uploadImage, createUser)
userRouter.post("/signin", signIn)
userRouter.post("/verify-otp", verifyOTP)
userRouter.post("/forgot-password", resetPasswordEmail)
userRouter.post("/reset-password/:resetToken", resetPassword)
userRouter.post("/request-verification",[authenticate, uploadImage], requestVerification)
userRouter.get("/view-request/:id",[authenticate, authorize(Role.Admin)], viewVerificationRequest)
userRouter.put("/verify-account/:id", [authenticate, authorize(Role.Admin)], verifyAccount)
userRouter.get("/profile", authenticate, getUserProfile)

export default userRouter