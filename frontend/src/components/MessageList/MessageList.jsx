import React from 'react'
import './MessageList.css'

const MessageList = ({ messages }) => {
    console.log(messages)

    // Crear Componente Message
    const MessageJsx = messages.map((message, index) => {
        return (
            <div className='workspace-message-area-message' key={index}>{message.content}</div>
        )
    })

    return (
        <div className='workspace-message-area-message-list'>
            {MessageJsx}
        </div>
    )
}

export default MessageList