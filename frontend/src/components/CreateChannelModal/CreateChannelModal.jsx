import React from 'react'
import './CreateChannelModal.css'
import { useForm } from '../../hooks'


const CreateChannelModal = ({ isOpen, onClose, onCreate }) => {
    const formInitialState = {
        name: '',
    }

    const { formState, handleInput, resetFormState } = useForm(formInitialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        onCreate(formState)
        resetFormState()
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <div>
                    <h3>Channel details</h3>
                    <form method="post" onSubmit={handleSubmit}>
                        <label htmlFor="name">Channel name</label>
                        <input
                            placeholder='# e.g. subscription-budget'
                            value={formState.name}
                            onChange={handleInput}
                            name="name"
                            id="name" />
                        <button type="submit">Create</button>
                    </form>
                </div>
                <div>
                    <button type="button" onClick={onClose}>X</button>
                    <div>
                        Replica de Slack
                        <div>{formState.name}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateChannelModal