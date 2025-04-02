import React, { use, useEffect, useRef } from 'react'
import './MessageList.css'
import Message from '../Message/Message'

const MessageList = ({ messages }) => {
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Crear Componente Message
    const MessageJsx = messages.map((message, index) => {
        return (
            <Message
                key={index}
                username={message.sender.username}
                messageContent={message.content}
                messageTime={message.created_at}
                userAvatar={message.sender.avatar}
            />
        )
    })

    return (
        <div className='workspace-message-area-message-list'>
            {MessageJsx}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default MessageList