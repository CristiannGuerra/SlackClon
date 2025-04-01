import express from "express"
import { createNewUserController, getUserController, loginController, resetPasswordController, rewritePasswordController, verifyEmailController } from "../controllers/auth.controller.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const authRouter = express.Router()

authRouter.post('/register', createNewUserController)
authRouter.get('/verify-email', verifyEmailController)
authRouter.post('/login', loginController)
authRouter.post('/reset-password', resetPasswordController)
authRouter.put('/rewrite-password', rewritePasswordController)
authRouter.get('/me', authMiddleware, getUserController)


export default authRouter

