import nodemailer from "nodemailer"
import ENVIRONMENT from "../config/enviroment.config.js"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: ENVIRONMENT.GMAIL_USERNAME,
        pass: ENVIRONMENT.GMAIL_PASSWORD
    }
})

const sendMail = async ({ to, subject, html }) => {
    const response = await transporter.sendMail({
        from: ENVIRONMENT.GMAIL_USERNAME,
        to,
        subject,
        html
    });
    return response
}

export default sendMail