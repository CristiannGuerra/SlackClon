import mongoose from "mongoose"

export const CHANNEL_PROPS = {
    NAME: "name",
    WORKSPACE_REF: "workspace_ref",
    CREATED_AT: "created_at",
    CREATED_BY: "created_by"
}

const channelSchema = new mongoose.Schema({
    [CHANNEL_PROPS.NAME]: {
        type: String,
        required: true
    },
    [CHANNEL_PROPS.WORKSPACE_REF]: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    [CHANNEL_PROPS.CREATED_AT]: {
        type: Date,
        default: Date.now
    },
    [CHANNEL_PROPS.CREATED_BY]: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Channel = mongoose.model("Channel", channelSchema)

export default Channel