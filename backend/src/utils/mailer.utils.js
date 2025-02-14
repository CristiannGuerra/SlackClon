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
        to,
        subject,
        html
    })
}

export default sendMail