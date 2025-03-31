import channelRepository from "../repositories/channel.repository.js"
import ServerError from "../utils/errors.utils.js"

const createChannelController = async (req, res) => {
    try {
        const { name: channel_name } = req.body
        const { _id: member_id } = req.user
        const { workspace_id } = req.params


        // Validate data
        if (!channel_name) {
            throw new ServerError("Channel name is required", 400)
        }
        if (!member_id) {
            throw new ServerError("Member id is required", 400)
        }
        if (!workspace_id) {
            throw new ServerError("Workspace id is required", 400)
        }

        // Create channel
        await channelRepository.createChannel({ name: channel_name, workspace_id, member_id })

        // Response to client
        res.json({
            message: `Channel created successfully with name: ${channel_name}`,
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

        // Return internal server error
        return res.status(500).send({
            message: "Internal Server Error",
            status: 500,
            ok: false
        })

    }
}

const getChannelsController = async (req, res) => {
    try {
        const { workspace_id } = req.params

        const channels = await channelRepository.getChannelsByWorkspaceId(workspace_id)

        res.json({
            message: "Channels found successfully",
            status: 200,
            ok: true,
            payload: {
                channels
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

        // Return internal server error
        return res.status(500).send({
            message: "Internal Server Error",
            status: 500,
            ok: false,
            error: error
        })
    }
}

const getChannelController = async (req, res) => {
    try {
        const { channel_id, workspace_id } = req.params

        const channel = await channelRepository.findChannelById(channel_id)

        res.json({
            message: "Channel found successfully",
            status: 200,
            ok: true,
            payload: {
                channel
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

        // Return internal server error
        return res.status(500).send({
            message: "Internal Server Error",
            status: 500,
            ok: false,
            error: error
        })

    }
}



export { createChannelController, getChannelsController, getChannelController }