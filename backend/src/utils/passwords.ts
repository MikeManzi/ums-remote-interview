import bcrypt from "bcrypt"
import { sha256 } from "js-sha256"

export const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*]/;

    if (password.length < minLength || !uppercaseRegex.test(password) || !specialCharRegex.test(password)) {
        return false;
    }

    return true;
}

export const hashPassword = async (password: string ) => {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    return hashed
}

export const generateResetToken = () => {
    const randomToken = Math.random().toString(36).substring(2, 22)
    const resetToken = sha256(randomToken).toString()
    const resetTokenExpiration = Date.now() + 3600000
    return { resetToken, resetTokenExpiration }
}