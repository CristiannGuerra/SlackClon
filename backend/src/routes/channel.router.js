import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { createChannelController } from "../controllers/channel.controller.js"
import { sendMessageToChannelController } from "../controllers/message.controller.js"


const channelRouter = Router()

// Routes for channels
channelRouter.post("/:workspace_id", authMiddleware, createChannelController)

// Routes for messages
channelRouter.post("/:channel_id/message", authMiddleware, sendMessageToChannelController)

export default channelRouter