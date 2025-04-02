import React from 'react'
import './MessageInput.css'
import ENVIROMENT from '../../config/enviroment.config'
import { useParams } from 'react-router-dom'
import { useForm } from '../../hooks'

const MessageInput = ({ onMessageSent, channel_name }) => {
    const textareaRef = React.useRef(null)

    const { channel_id } = useParams()

    // Initial State Form
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Ctrl/Cmd + Enter = nuevo salto de línea
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const textarea = e.target;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;

                // Insertar salto de línea en la posición del cursor
                const newValue =
                    formState.message.slice(0, start) +
                    '\n' +
                    formState.message.slice(end);

                // Actualizar el estado del formulario
                handleInput({
                    target: {
                        name: 'message',
                        value: newValue
                    }
                });

                // Actualizar posición del cursor después del renderizado
                setTimeout(() => {
                    textarea.selectionStart = start + 1;
                    textarea.selectionEnd = start + 1;
                }, 0);
            }
            // Enter normal = enviar mensaje
            else if (!e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
            }
        }
    }



    return (
        <form method="post" onSubmit={handleSubmit} className='workspace-message-area-message-input-form'>
            <label hidden htmlFor="message"></label>
            <div className='workspace-message-area-message-input-tools' >tool 1</div>
            <textarea
                ref={textareaRef}
                value={formState.message}
                onKeyDown={handleKeyDown}
                onChange={handleInput}
                placeholder={`Mensaje a #${channel_name}`}
                name="message"
                id="message"
                className='workspace-message-area-message-input'></textarea>
            <button className='workspace-message-area-message-input-button' type="submit">Send</button>
        </form>
    )
}

export default MessageInput