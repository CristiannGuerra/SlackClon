import workspaceRepository from "../repositories/workspace.repository.js"

const createWorkspaceController = async (req, res) => {
    try {
        // Get data from request
        const { name } = req.body
        const { _id} = req.user

        // Validate data
        if (!name) {
            throw new ServerError("Name is required", 400)
        }
        if (!_id) {
            throw new ServerError("User id is required", 400)
        }

        // Create workspace
        await workspaceRepository.createWorkspace({ name, owner_id: _id })

        // Response to client
        res.send({
            message: `Workspace created successfully with name: ${name}`,
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

        return res.status(500).send({
            message: error.message,
            status: 500,
            ok: false
        })



    }
}

export { createWorkspaceController }