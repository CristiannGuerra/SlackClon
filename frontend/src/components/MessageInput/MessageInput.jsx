import React, { useState } from 'react'
import './MessageInput.css'
import ENVIROMENT from '../../config/enviroment.config'
import { useParams } from 'react-router-dom'
import { useForm } from '../../hooks'

const MessageInput = ({ onMessageSent, channel_name }) => {
    const { channel_id } = useParams();

    // // Initial State Form
    const formInitialState = {
        message: ''
    }

    // Custom Hook Form
    const { formState, handleInput, resetFormState } = useForm(formInitialState)


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                ENVIROMENT.URL_API + `/api/channel/${channel_id}/messages`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('authorization_token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formState)
                });

            if (response.ok) {
                onMessageSent(); // Actualizar la lista de mensajes
                resetFormState()                
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }


    return (
        <form method="post" onSubmit={handleSubmit}>
            <label hidden htmlFor="message"></label>
            <div className='workspace-message-area-message-input-tools' >tool 1</div>
            <textarea value={formState.message} onChange={handleInput} placeholder={`Mensaje a #${channel_name}`} name="message" id="message" className='workspace-message-area-message-input'></textarea>
            <button type="submit">Send</button>
        </form>
    )
}

export default MessageInput