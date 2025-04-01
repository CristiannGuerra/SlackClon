import React from 'react'
import { useForm } from '../../hooks'
import ENVIROMENT from '../../config/enviroment.config'

const CreateWorkspace = () => {


    // Initial State Form
    const formInitialState = {
        name: ''
    }


    // Custom Hook Form
    const { formState, handleInput, resetFormState } = useForm(formInitialState)


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                ENVIROMENT.URL_API + `/api/workspace/`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('authorization_token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formState)
                });

            if (response.ok) {
                resetFormState()
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }


    return (
        <form method="post" onSubmit={handleSubmit}>
            <label hidden htmlFor="name"></label>
            <div className='workspace-message-area-message-input-tools' >tool 1</div>
            <input value={formState.name} onChange={handleInput} placeholder="Workspace Name" name="name" id="name" className='workspace-message-area-message-input' />
            <button type="submit">Send</button>
        </form>
    )
}

export default CreateWorkspace