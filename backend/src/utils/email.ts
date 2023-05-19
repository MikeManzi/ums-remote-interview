import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
})

export const sendResetPasswordEmail = async (email: string, resetToken: string) => {
    
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Password Reset Request",
        html: `You are receiving this email because you (or someone else) has requested the reset of the password for your account.<br><br>
        Please click on the following link, or paste this into your browser to complete the process:<br><br>
        <a href="http://localhost:5173/reset-password/${resetToken}">Reset Password</a><br><br>
        This link is valid for 1 hour.<br><br>
        If you did not request this, please ignore this email and your password will remain unchanged.<br>`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("The error is ")
            console.log(error)
        } else {
            console.log(`Email sent: ${info.response}`)
        }
    })
}

export const sendOneTimePassword =async (email: string, otp: string) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Multifactor Authentication",
        html: `You are receiving this email because you (or someone else) has attempted to log into your UMS account.<br><br>
        Use this otp: <strong>${otp}</strong> to log in.`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("The error is ")
            console.log(error)
        } else {
            console.log(`Email sent: ${info.response}`)
        }
    })
    
}

