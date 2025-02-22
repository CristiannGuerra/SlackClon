import express from "express"
import { createNewUserController, loginController, resetPasswordController, verifyEmailController } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post('/register', createNewUserController)
authRouter.get('/verify-email', verifyEmailController)
authRouter.post('/login', loginController)
authRouter.post('/reset-password', resetPasswordController)


export default authRouter

