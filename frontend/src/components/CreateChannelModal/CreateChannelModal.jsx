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
        // <div className='modal-overlay'>
        //     <div className='modal-content'>
        //         <div className='create-channel-modal' >
        //             <h3 className='create-channel-modal-title'>Channel details</h3>
        //             <form method="post" onSubmit={handleSubmit}>
        //                 <label htmlFor="name">Channel name</label>
        //                 <input
        //                     placeholder='# e.g. subscription-budget'
        //                     value={formState.name}
        //                     onChange={handleInput}
        //                     name="name"
        //                     id="name" />
        //                 <button type="submit">Create</button>
        //             </form>
        //         </div>
        //         <div className='modal-header' >
        //             <button type="button" onClick={onClose}>X</button>
        //             <div>
        //                 Replica de Slack
        //                 <div>{formState.name}</div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className='modal-overlay'>
            <div className='modal-content'>
                <div className='create-channel-modal'>
                    <h3 className='create-channel-modal__title'>Channel details</h3>
                    <form className='create-channel-form' method="post" onSubmit={handleSubmit}>
                        <label className='create-channel-form__label' htmlFor="name">Channel name</label>
                        <input
                            className='create-channel-form__input'
                            placeholder='# e.g. subscription-budget'
                            value={formState.name}
                            onChange={handleInput}
                            name="name"
                            id="name"
                        />
                        <button className='create-channel-form__submit' type="submit">Create</button>
                    </form>
                </div>

                <div className='minislack'>
                    <div className='minislack__header'>
                        <button className='minislack__close-btn' type="button" onClick={onClose}>X</button>
                    </div>
                    <div className='minislack__content'>
                        <div className='minislack__channel-name'>{`# ${formState.name}`}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateChannelModal