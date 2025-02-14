import ENVIRONMENT from "../config/enviroment.config.js"
import UserRepository from "../repositories/user.repository.js"
import ServerError from "../utils/errors.utils.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sendMail from "../utils/mailer.utils.js"
import User from "../models/User.model.js"

const createNewUserController = async (req, res) => {
    try {
        // Get data from request
        const { username, email, password } = req.body

        // Validate data
        if (!username) {
            throw new ServerError("Username is required", 400)
        }
        if (!email) {
            throw new ServerError("Email is required", 400)
        }
        if (!password) {
            throw new ServerError("Password is required", 400)
        }

        // Encrypt password
        const passwordHash = await bcrypt.hash(password, 10)

        // Generate token
        const verification_token = jwt.sign(
            { email }, // Payload => Email
            ENVIRONMENT.SECRET_KEY_JWT, // Secret key
            { expiresIn: "24h" } // Options => Expires in 24 hours
        )

        // Create user
        await UserRepository.create({ username, email, password: passwordHash, verification_token })

        // Send verification email
        await sendMail({
            to: email,
            subject: "Verify your account",
            html: `
                <h1>Verify your account</h1>
                <p>
                    This verification token is valid for 24 hours.
                </p>
                <a href="${ENVIRONMENT.URL_BACKEND}/api/auth/verify-email?verification_token=${verification_token}">Click Aqui</a>`
        })

        // Send response
        return res.send({
            message: "User created successfully",
            status: 201,
            ok: true
        })

        // Catch errors
    } catch (error) {
        // If error has a status, return it
        if (error.status) {
            return res.status(error.status).send({
                message: error.message,
                status: error.status,
                ok: false
            })
        }
        // Log error for debugging
        console.log(error)
        // If error doesn't have a status, return 500
        return res.send({
            message: error.message,
            status: 500,
            ok: false
        })

    }

}


const verifyEmailController = async (req, res) => {
    try {
        // Get data from request
        const { verification_token } = req.query

        // Validate data
        const payload = jwt.verify(verification_token, ENVIRONMENT.SECRET_KEY_JWT)
        const { email } = payload

        // Update user
        await UserRepository.veryfyUserByEmail(email)

        // Response
        return res.send({
            message: "Email verified successfully",
            status: 200,
            ok: true
        })

    } catch (error) {
        // If error has a status, return it
        if (error.status) {
            return res.status(error.status).send({
                message: error.message,
                status: error.status,
                ok: false
            })
        }
        // Log error for debugging
        console.log(error)
        // If error doesn't have a status, return 500
        return res.send({
            message: error.message,
            status: 500,
            ok: false
        })

    }

}


const loginController = async (req, res) => {
    try {
        // Get data from request
        const { email, password } = req.body

        // Validate data
        if (!email) {
            throw new ServerError("Email is required", 400)
        }
        if (!password) {
            throw new ServerError("Password is required", 400)
        }

        // Find user
        const user_found = await UserRepository.findUserByEmail(email)

        // Validate user
        if (!user_found) {
            throw new ServerError("User not found", 404)
        }

        if (!user_found.verified) {
            throw new ServerError("User not verified yet, please verify your account before continue", 400)
        }

        // Validate password
        const isCorrectPassword = await bcrypt.compare(password, user_found.password)

        if (!isCorrectPassword) {
            throw new ServerError("Password Incorrect", 400)
        }

        // Generate token
        const autorizathion_token = jwt.sign(
            {
                id: user_found._id,
                username: user_found.username,
                email: user_found.email
            },
            ENVIRONMENT.SECRET_KEY_JWT,
            { expiresIn: '2h' }

        )

        // Response
        return res.send({
            message: "User logged successfully",
            status: 200,
            ok: true,
            payload: {
                autorizathion_token
            }
        })

    } catch (error) {
        // If error has a status, return it
        if (error.status) {
            return res.status(error.status).send({
                message: error.message,
                status: error.status,
                ok: false
            })
        }
        // Log error for debugging
        console.log(error)
        // If error doesn't have a status, return 500
        return res.send({
            message: error.message,
            status: 500,
            ok: false
        })

    }

}


export { createNewUserController, verifyEmailController, loginController }