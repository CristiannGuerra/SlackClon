import React from 'react'
import './Message.css'
import { formato24HorasUTC } from '../../utils/formatDate.utils'

const Message = ({ username, messageContent, messageTime, userAvatar }) => {


    return (
        <div className='workspace-message-area-message'>
            <div className='workspace-message-area-message-avatar'>Avatar</div>
            <div className='workspace-message-area-message-info'>
                <div className='workspace-message-area-message-info-header'>
                    <div className='workspace-message-area-message-info-header-name'>{username}</div>
                    <div className='workspace-message-area-message-info-header-time'>{formato24HorasUTC(messageTime)}</div>
                </div>
                <div className='workspace-message-area-message-info-content'>{messageContent}</div>
            </div>
        </div>
    )
}

export default Message