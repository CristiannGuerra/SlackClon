import { WORKSPACE_PROPS } from "../models/Workspace.model.js"
import Workspace from "../models/Workspace.model.js"

class WorkspaceRepository {

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
}

const workspaceRepository = new WorkspaceRepository()

export default workspaceRepository