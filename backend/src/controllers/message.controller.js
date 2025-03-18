import messageRepository from "../repositories/message.repository.js"
import ServerError from "../utils/errors.utils.js"

const sendMessageToChannelController = async (req, res) => {
    try {
        // Get data from request
        const { channel_id } = req.params
        const { _id: sender } = req.user
        const { content } = req.body

        // Validate data
        if (!channel_id) {
            throw new ServerError("Channel id is required", 400)
        }
        if (!sender) {
            throw new ServerError("Sender is required", 400)
        }
        if (!content) {
            throw new ServerError("Content is required", 400)
        }

        // Create message
        const new_message = await messageRepository.createMessage({ channel_id, sender, content })

        // Response to client
        res.json({
            message: "Message created successfully",
            status: 200,
            ok: true,
            payload: {
                message: new_message
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
        // Log error for debugging
        console.log(error)

        // Response to client
        res.status(500).send({
            message: "Internal server error",
            status: 500,
            ok: false
        })

    }
}

const getMessagesController = async (req, res) => {
    try {
        const { channel_id } = req.params

        const messages = await messageRepository.getMessagesByChannelId(channel_id)

        res.json({
            message: "Messages found successfully",
            status: 200,
            ok: true,
            payload: {
                messages
            }
        })

    } catch (error) {

    }
}

export { sendMessageToChannelController, getMessagesController }