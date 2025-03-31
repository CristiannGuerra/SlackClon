import { CHANNEL_PROPS } from "../models/Channel.model.js";
import Message, { MESSAGE_PROPS } from "../models/Message.model.js";
import Workspace, { WORKSPACE_PROPS } from "../models/Workspace.model.js";
import ServerError from "../utils/errors.utils.js";
import channelRepository from "./channel.repository.js";

class MessageRepository {
    async createMessage({ channel_id, sender, content }) {
        // Find channel
        const channel_found = await channelRepository.findChannelById(channel_id)

        // Validate data
        if (!channel_found) {
            throw new ServerError("Channel not found", 404)
        }

        // Validate member of workspace
        // Find workspace
        const workspace_found = await Workspace.findById(channel_found[CHANNEL_PROPS.WORKSPACE_REF])

        if (!workspace_found[WORKSPACE_PROPS.MEMBERS].includes(sender)) {
            throw new ServerError("Only workspace members can send messages", 403)
        }

        // Create message
        const new_message = await Message.create(
            {
                [MESSAGE_PROPS.CHANNEL_REF]: channel_id,
                [MESSAGE_PROPS.SENDER]: sender,
                [MESSAGE_PROPS.CONTENT]: content
            }
        )

        // Return message
        return new_message
    }

    async getMessagesByChannelId(channel_id) {
        const messages_list = await Message.find({ [MESSAGE_PROPS.CHANNEL_REF]: channel_id }).populate('sender', 'username').populate('channel_ref', 'name' )

        return messages_list
    }
}

const messageRepository = new MessageRepository()

export default messageRepository