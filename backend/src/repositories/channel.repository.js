import Workspace, { WORKSPACE_PROPS } from "../models/Workspace.model.js"
import Channel, { CHANNEL_PROPS } from "../models/Channel.model.js"
import ServerError from "../utils/errors.utils.js"
class ChannelRepository {

    async findChannelById(channel_id) {
        return await Channel.findById(channel_id)
    }
    async createChannel({ name, workspace_id, member_id }) {
        try {
            // Find workspace
            const workspace_found = await Workspace.findById(workspace_id)

            // Validate data
            if (!workspace_found) {
                throw new ServerError("Workspace not found", 404)
            }

            if (!workspace_found[WORKSPACE_PROPS.MEMBERS].includes(member_id)) {
                throw new ServerError("Only workspace members can create channels", 403)
            }

            // Create channel
            await Channel.create({
                [CHANNEL_PROPS.NAME]: name,
                [CHANNEL_PROPS.WORKSPACE_REF]: workspace_id,
                [CHANNEL_PROPS.CREATED_BY]: member_id
            })

        } catch (error) {
            throw error
        }
    }
}

const channelRepository = new ChannelRepository()

export default channelRepository