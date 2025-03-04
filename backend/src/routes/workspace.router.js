import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createWorkspaceController, inviteUserToWorkspaceController } from "../controllers/workspace.controller.js";

const workspace_router = Router()

workspace_router.post('/', authMiddleware, createWorkspaceController)
workspace_router.post('/:workspace_id/invite/:invited_id', authMiddleware, inviteUserToWorkspaceController)


export default workspace_router