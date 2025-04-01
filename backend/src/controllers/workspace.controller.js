import workspaceRepository from "../repositories/workspace.repository.js"
import ServerError from "../utils/errors.utils.js"
import channelRepository from './../repositories/channel.repository.js';

const createWorkspaceController = async (req, res) => {
    try {
        // Get data from request
        const { name } = req.body
        const { _id } = req.user

        // Validate data
        if (!name) {
            throw new ServerError("Name is required", 400)
        }
        if (!_id) {
            throw new ServerError("User id is required", 400)
        }

        // Create workspace
        const workspace_created = await workspaceRepository.createWorkspace({ name, owner_id: _id })

        const create_channel = await channelRepository.createChannel({ name: "general", workspace_id: workspace_created._id, member_id: _id })

        // Response to client
        res.json({
            message: `Workspace created successfully with name: ${name}`,
            status: 200,
            ok: true,
            payload: {
                channel: create_channel
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

        return res.status(500).send({
            message: error.message,
            status: 500,
            ok: false
        })



    }
}

const inviteUserToWorkspaceController = async (req, res) => {
    try {
        // Get data from request
        const { _id: owner_id } = req.user
        const { workspace_id, invited_id } = req.params

        // Validate data
        if (!owner_id) {
            throw new ServerError("User id is required", 400)
        }
        if (!workspace_id) {
            throw new ServerError("Workspace id is required", 400)
        }
        if (!invited_id) {
            throw new ServerError("Invited id is required", 400)
        }

        // Invite user to workspace
        const workspace_found = await workspaceRepository.addMemberToWorkspace({ workspace_id, owner_id, invited_id })

        // Response to client
        res.json({
            message: `User added to workspace successfully`,
            status: 200,
            ok: true,
            payload: {
                workspace: workspace_found
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

        return res.status(500).send({
            message: error.message,
            status: 500,
            ok: false
        })
    }
}

const getWorkspacesController = async (req, res) => {
    try {
        // Get data from request
        const { _id } = req.user

        // Validate data
        if (!_id) {
            throw new ServerError("User id is required", 400)
        }

        // Get workspaces
        const workspaces = await workspaceRepository.getWorkspacesByUserId(_id)

        // Response to client
        res.json({
            message: "Workspaces found successfully",
            status: 200,
            ok: true,
            payload: {
                workspaces
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

        return res.status(500).send({
            message: error.message,
            status: 500,
            ok: false
        })
    }
}

const getWorkspaceController = async (req, res) => {
    try {
        const { workspace_id } = req.params

        const workspace = await workspaceRepository.findWorkspaceById(workspace_id)

        res.json({
            message: "Workspace found successfully",
            status: 200,
            ok: true,
            payload: {
                workspace
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

        return res.status(500).send({
            message: error.message,
            status: 500,
            ok: false
        })
    }
}

export { createWorkspaceController, inviteUserToWorkspaceController, getWorkspacesController, getWorkspaceController }