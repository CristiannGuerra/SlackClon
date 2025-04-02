import ENVIRONMENT from "../config/enviroment.config.js"
import UserRepository from "../repositories/user.repository.js"
import ServerError from "../utils/errors.utils.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sendMail from "../utils/mailer.utils.js"
import { isValidEmail } from "../utils/validate.utils.js"
import workspaceRepository from './../repositories/workspace.repository.js';
import channelRepository from "../repositories/channel.repository.js"

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
        if (!isValidEmail(email)) {
            throw new ServerError("Email is invalid", 400)
        }


        // Encrypt password
        const passwordHash = await bcrypt.hash(password, 10)

        // Generate token
        const verification_token = jwt.sign(
            { email }, // Payload => Email
            ENVIRONMENT.SECRET_KEY_JWT, // Secret key
            { expiresIn: "24h" } // Options => Expires in 24 hours
        )

        // Create User
        const user_created = await UserRepository.create({ username, email, password: passwordHash, verification_token })

        // Create Workspace
        const workspace_name = `${username}'s Workspace`
        const workspace_created = await workspaceRepository.createWorkspace({ name: workspace_name, owner_id: user_created._id })

        // Create Channel
        const create_channel = await channelRepository.createChannel({ name: "general", workspace_id: workspace_created._id, member_id: user_created._id })

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
                _id: user_found._id,
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
                autorizathion_token,
                user: user_found.id
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


const resetPasswordController = async (req, res) => {
    try {
        // Get data from request
        const { email } = req.body

        // Validate data
        if (!email) {
            throw new ServerError("Email is required", 400)
        }

        // Find user
        const user_found = await UserRepository.findUserByEmail(email)

        // Generate token
        const reset_token = jwt.sign({ email, _id: user_found._id }, ENVIRONMENT.SECRET_KEY_JWT, { expiresIn: '1h' })

        // Send email to user with reset token
        await sendMail({
            to: email,
            subject: "Reset Password",
            html: `
            <h1>Reset Password</h1>
            <p> Hello ${user_found.username} you have requested to reset your password if you didn't do it, please ignore this email</p>
            <p>Click <a href="${ENVIRONMENT.URL_FRONTEND}/rewrite-password/?reset_token=${reset_token}">here</a> to reset your password</p>
            `
        })

        // Response
        return res.send({
            message: "Reset email sent successfully",
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
        // If error doesn't have a status, return 500
        return res.send({
            message: error.message,
            status: 500,
            ok: false,
        })

    }
}


const rewritePasswordController = async (req, res) => {
    try {
        // Get data from request
        const { password, reset_token } = req.body
        const { _id } = jwt.verify(reset_token, ENVIRONMENT.SECRET_KEY_JWT)

        // Validate data
        if (!password) {
            throw new ServerError("Password is required", 400)
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Update user
        await UserRepository.updateUserById(_id, hashedPassword)

        return res.send({
            message: "Password updated successfully",
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
        // If error doesn't have a status, return 500
        return res.send({
            message: error.message,
            status: 500,
            ok: false,
        })
    }
}

const getUserController = async (req, res) => {
    try {
        // Get data from request
        const { _id } = req.user

        // Validate data
        if (!_id) {
            throw new ServerError("User id is required", 400)
        }

        // Find user
        const user_found = await UserRepository.findUserById(_id)

        // Response
        return res.send({
            message: "User found successfully",
            status: 200,
            ok: true,
            payload: {
                user: user_found
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
        // If error doesn't have a status, return 500
        return res.send({
            message: error.message,
            status: 500,
            ok: false,
        })
    }
}


export {
    createNewUserController,
    verifyEmailController,
    loginController,
    resetPasswordController,
    rewritePasswordController,
    getUserController
}