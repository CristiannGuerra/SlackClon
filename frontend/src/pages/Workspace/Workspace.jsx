import React from 'react'
import './Workspace.css'
import { useParams } from 'react-router-dom'

const Workspace = () => {
    const { workspace_id } = useParams()

    console.log(workspace_id)


    return (
        <div>
            {/* 
            Toolbar
            Navbar
            Sidebar => ChannelsList
                    => DirectMessagesList
            MessageArea => MessageList
                        => MessageInput
            */}
        </div>
    )
}

export default Workspace