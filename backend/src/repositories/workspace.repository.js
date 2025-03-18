import { WORKSPACE_PROPS } from "../models/Workspace.model.js"
import Workspace from "../models/Workspace.model.js"
import ServerError from "../utils/errors.utils.js"

class WorkspaceRepository {

    async findWorkspaceById(workspace_id) {
        try {
            return await Workspace.findById(workspace_id)

        } catch (error) {
            throw error
        }
    }

    async createWorkspace({ name, owner_id }) {
        try {
            Workspace.create(
                {
                    [WORKSPACE_PROPS.NAME]: name,
                    [WORKSPACE_PROPS.OWNER]: owner_id,
                    [WORKSPACE_PROPS.MEMBERS]: [owner_id]
                }
            )
        } catch (error) {
            throw error
        }
    }

    async addMemberToWorkspace({ workspace_id, owner_id, invited_id }) {
        try {
            // Find workspace by id
            const workspace_found = await this.findWorkspaceById(workspace_id)

            // Validate data
            if (!workspace_found) {
                throw new ServerError("Workspace not found", 404)
            }
            if (!workspace_found[WORKSPACE_PROPS.OWNER].equals(owner_id)) {
                throw new ServerError("Only workspace owner can invite members", 400)
            }
            if (workspace_found[WORKSPACE_PROPS.MEMBERS].includes(invited_id)) {
                throw new ServerError("User already invited to workspace", 400)
            }

            // Add member to workspace
            workspace_found[WORKSPACE_PROPS.MEMBERS].push(invited_id)

            // Save workspace
            await workspace_found.save()

            // Return workspace
            return workspace_found

        } catch (error) {
            throw error
        }

    }

    async getWorkspacesByUserId (owner_id) {
        const workspaces_list = await Workspace.find({[WORKSPACE_PROPS.MEMBERS]: owner_id})

        return workspaces_list
    }
}


const workspaceRepository = new WorkspaceRepository()

export default workspaceRepository