import React, { useEffect, useState } from 'react'
import MessageList from '../MessageList/MessageList'
import MessageInput from '../MessageInput/MessageInput'
import { useParams } from 'react-router-dom';
import ENVIROMENT from '../../config/enviroment.config';

const Channel = () => {
    const [messages, setMessages] = useState([]);
    const { channel_id } = useParams();

    // Función para obtener mensajes
    const fetchMessages = async () => {
        try {
            const response = await fetch(
                ENVIROMENT.URL_API + `/api/channel/${channel_id}/messages`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('authorization_token')}`
                    },
                }
            )
            const data = await response.json();
            setMessages(data.payload.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }

    // Cargar mensajes al montar el componente
    useEffect(() => {
        fetchMessages()
    }, []);

    useEffect(() => {
        fetchMessages()
    }, [channel_id]);



    return (
        <div className='workspace-message-area'>
            <div className='workspace-message-area-header'>
                <div className='workspace-message-area-header-channel'>
                    <div className='workspace-message-area-header-channel-name'># general</div>
                    <div className='workspace-message-area-header-channel-info'>
                        <div className='workspace-message-area-header-channel-members'>Members</div>
                    </div>
                </div>
                <div className='workspace-message-area-header-actions' >
                    <div>Mensajes</div>
                    <div>Agregar canvas</div>
                    <div>Marcadores</div>
                    <div>Archivos</div>
                </div>
            </div>
            {/* MessageList */}
            <MessageList messages={messages} />
            {/* New Message Input */}
            <MessageInput onMessageSent={fetchMessages} />
        </div>
    )
}

export default Channel