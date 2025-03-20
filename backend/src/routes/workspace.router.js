import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createWorkspaceController, inviteUserToWorkspaceController, getWorkspacesController, getWorkspaceController} from "../controllers/workspace.controller.js";

const workspace_router = Router()

workspace_router.post('/', authMiddleware, createWorkspaceController)
workspace_router.post('/:workspace_id/invite/:invited_id', authMiddleware, inviteUserToWorkspaceController)
workspace_router.get('/', authMiddleware, getWorkspacesController)
workspace_router.get('/:workspace_id', authMiddleware, getWorkspaceController)


export default workspace_router