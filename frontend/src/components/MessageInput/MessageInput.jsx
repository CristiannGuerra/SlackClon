import React from 'react'
import './MessageInput.css'
import { useApiRequest, useForm } from '../../hooks'
import ENVIROMENT from '../../config/enviroment.config'
import { useParams } from 'react-router-dom'

const MessageInput = () => {
    const { channel_id } = useParams()

    const formInitialState = {
        message: ""
    }

    const { formState, handleInput } = useForm(formInitialState)

    const { apiResponse, postRequest } = useApiRequest(ENVIROMENT.URL_API + `/api/channel/${channel_id}/messages`)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await postRequest(formState)
    }

    console.log(apiResponse)

    return (
        <form method="post" onSubmit={handleSubmit}>
            <label hidden htmlFor="message"></label>
            <div className='workspace-message-area-message-input-tools' >tool 1</div>
            <textarea value={formState.message} onChange={handleInput} placeholder='Mensaje a #general' name="message" id="message" className='workspace-message-area-message-input'></textarea>
            <button type="submit">Send</button>
        </form>
    )
}

export default MessageInput