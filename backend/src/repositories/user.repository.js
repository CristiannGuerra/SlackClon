import User, { USER_PROPS } from "../models/User.model.js";
import ServerError from "../utils/errors.utils.js";


class UserRepository {


    async create({ username, email, password, verification_token }) {
        try {
            await User.create({
                [USER_PROPS.USERNAME]: username,
                [USER_PROPS.EMAIL]: email,
                [USER_PROPS.PASSWORD]: password,
                [USER_PROPS.VERIFICATION_TOKEN]: verification_token
            })
        } catch (error) {
            if (error.code === 11000) {
                if (error.keyPattern.email) {
                    throw new ServerError("Email already exists", 400)
                }
                if (error.keyPattern.username) {
                    throw new ServerError("Username already exists", 400)
                }
            }
            console.log(error)
            throw error
        }
    }

    async veryfyUserByEmail(email) {
        const user_found = await User.findOne({ [USER_PROPS.EMAIL]: email })
        if (!user_found) {
            throw new ServerError("User not found", 404)
        }
        if (user_found.verified) {
            throw new ServerError("User already verified", 400)
        }
        user_found.verified = true
        await user_found.save()
        return user_found
    }

    async findUserByEmail(email) {
        const user_found = await User.findOne({ [USER_PROPS.EMAIL]: email })
        if (!user_found) {
            throw new ServerError("User not found", 404)
        }
        if (!user_found.verified) {
            throw new ServerError("User not verified yet, please verify your account before continue", 400)
        }
        return user_found
    }

    async updateUserById(_id, newPassword) {
        const user_found = await User.findById(_id)
        if (!user_found) {
            throw new ServerError("User not found", 404)
        }
        user_found.password = newPassword
        await user_found.save()
    }
        
}

export default new UserRepository()