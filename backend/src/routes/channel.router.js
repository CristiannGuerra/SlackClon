import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { createChannelController, getChannelController, getChannelsController } from "../controllers/channel.controller.js"
import { sendMessageToChannelController, getMessagesController } from "../controllers/message.controller.js"


const channelRouter = Router()

// Routes for channels
channelRouter.post("/:workspace_id/channels", authMiddleware, createChannelController)
channelRouter.get("/:workspace_id/channels", authMiddleware, getChannelsController)
channelRouter.get("/:workspace_id/channels/:channel_id", authMiddleware, getChannelController)

// Routes for messages
channelRouter.post("/:channel_id/messages", authMiddleware, sendMessageToChannelController)
channelRouter.get("/:channel_id/messages", authMiddleware, getMessagesController)

export default channelRouter