import mongoose from "mongoose";

export const USER_PROPS = {
    USERNAME: "username",
    EMAIL: "email",
    PASSWORD: "password",
    VERIFIED: "verified",
    VERIFICATION_TOKEN: "verification_token",
    CREATED_AT: "created_at",
    UPDATED_AT: "updated_at",
    ACTIVE: "active"
}



const userSchema = new mongoose.Schema({
    [USER_PROPS.USERNAME]: {
        type: String,
        unique: true,
        required: true
    },
    [USER_PROPS.EMAIL]: {
        type: String,
        unique: true,
        required: true
    },
    [USER_PROPS.PASSWORD]: {
        type: String,
        required: true
    },
    [USER_PROPS.VERIFIED]: {
        type: Boolean,
        default: false
    },
    [USER_PROPS.VERIFICATION_TOKEN]: {
        type: String
    },
    [USER_PROPS.CREATED_AT]: {
        type: Date,
        default: Date.now
    },
    [USER_PROPS.UPDATED_AT]: {
        type: Date
    },
    [USER_PROPS.ACTIVE]: {
        type: Boolean,
        default: true
    }
})

const User = mongoose.model("User", userSchema)

export default User