import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { createChannelController, getChannelsController } from "../controllers/channel.controller.js"
import { sendMessageToChannelController, getMessagesController } from "../controllers/message.controller.js"


const channelRouter = Router()

// Routes for channels
channelRouter.post("/:workspace_id", authMiddleware, createChannelController)
channelRouter.get("/:workspace_id", authMiddleware, getChannelsController)

// Routes for messages
channelRouter.post("/:channel_id/message", authMiddleware, sendMessageToChannelController)
channelRouter.get("/:channel_id/message", authMiddleware, getMessagesController)

export default channelRouter