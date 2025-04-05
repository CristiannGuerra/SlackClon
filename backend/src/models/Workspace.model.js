import mongoose from "mongoose"

export const WORKSPACE_PROPS = {
    NAME: "name",
    OWNER: "owner",
    MEMBERS: "members",
    CREATED_AT: "created_at",
    CHANNELS: "channels",
}

const workspace_schema = new mongoose.Schema(
    {
        [WORKSPACE_PROPS.NAME]: { type: String, required: true },
        [WORKSPACE_PROPS.OWNER]: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        [WORKSPACE_PROPS.MEMBERS]: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
        [WORKSPACE_PROPS.CREATED_AT]: { type: Date, default: Date.now },
        [WORKSPACE_PROPS.CHANNELS]: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
        [WORKSPACE_PROPS.WORSPACE_IMG]: { type: String }
    }
)

const Workspace = mongoose.model("Workspace", workspace_schema)

export default Workspace