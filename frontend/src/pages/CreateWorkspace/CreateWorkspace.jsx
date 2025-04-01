import React from 'react'
import { useForm } from '../../hooks'
import ENVIROMENT from '../../config/enviroment.config'
import { Navbar } from '../../components'
import { IoCreateOutline } from 'react-icons/io5'
import { PiChatCircleTextLight } from 'react-icons/pi'
import { MdOutlineHeadset } from 'react-icons/md'
import "./CreateWorkspace.css"

const CreateWorkspace = () => {

    // Initial State Form
    const formInitialState = {
        name: ''
    }

    // Custom Hook Form
    const { formState, handleInput, resetFormState } = useForm(formInitialState)

    // Handle Submit Form
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
                const responseData = await response.json()
                window.location.href = `/workspace/${responseData.payload.workspace._id}`
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }


    return (
        <div>
            <div className='workspace'>
                <div className='toolbar'>
                </div>
                <div className='workspace-container'>
                    <Navbar />
                    <div className='workspace-sidebar'>
                        <div className='workspace-sidebar-header'>
                            <div className='workspace-sidebar-header-name'>{formState.name}</div>
                            <IoCreateOutline className='workspace-sidebar-header-icon' />
                        </div>
                        <div className='workspace-sidebar-actions' >
                            <div className='workspace-sidebar-action'>
                                <PiChatCircleTextLight className='workspace-sidebar-action-icon' />
                                <div className='workspace-sidebar-action-text'>Hilos de tus conversaciones</div>
                            </div>
                            <div className='workspace-sidebar-action'>
                                <MdOutlineHeadset className='workspace-sidebar-action-icon' />
                                <div className='workspace-sidebar-action-text'>Juntas</div>
                            </div>
                        </div>
                    </div>
                    <div className='create-workspace-area' >
                        <div className='create-workspace-area-container'>
                            <h1 className='create-workspace-area-title'>Como se llama tu empresa o Equipo?</h1>
                            <span className='create-workspace-area-description'>Este sera el nombre de tu espacio de trabajo de Slack: elige algo que tu equipo pueda reconocer.</span>
                            <form method="post" onSubmit={handleSubmit} className='create-workspace-area-form'>
                                <label hidden htmlFor="name"></label>
                                <input
                                    className='create-workspace-area-form-input'
                                    value={formState.name}
                                    onChange={handleInput}
                                    placeholder="P. ej.: Empresa 123 o Ficciones S. A."
                                    name="name"
                                    id="name" />
                                <button className='create-workspace-area-form-button' type="submit">Finalizar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateWorkspace