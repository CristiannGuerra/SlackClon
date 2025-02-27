import jwt from "jsonwebtoken"
import ENVIRONMENT from "../config/enviroment.config.js"
import ServerError from "../utils/errors.utils.js"

const authMiddleware = (req, res, next) => {
    try {
        // Get data from request
        const authorization_header = req.headers["authorization"]

        // Validate data
        if (!authorization_header) {
            throw new ServerError("Authorization header is required", 400)
        }

        // Get authorization token
        const authorization_token = authorization_header.split(" ")[1]

        // Verify token
        if (!authorization_token) {
            throw new ServerError("Authorization token is required", 400)
        }

        // Verify token
        const payload = jwt.verify(authorization_token, ENVIRONMENT.SECRET_KEY_JWT)

        // Add user to request
        req.user = payload

        // Next middleware
        next()

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

export { authMiddleware }