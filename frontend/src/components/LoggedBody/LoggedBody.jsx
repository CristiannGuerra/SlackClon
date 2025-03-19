import React from 'react'
import './LoggedBody.css'

const LoggedBody = () => {
    return (
        <div className='logged-body'>
            <div className='logged-body-title'>
                <h1 className='logged-body-title-text'><span className='logged-body-title-text-highlight'>Welcome back!</span> Stay hydrated!</h1>
                <span className='logged-body-title-description'>Choose a workspace below to get back to working with your team.</span>
            </div>
            <div className='workspace-list'>
                <div className='workspace-item'>
                    <div className='workspace-item-avatar'>Logo</div>
                    <div className='workspace-item-info-container'>
                        <div className='workspace-item-info'>
                            <div className='workspace-item-name'>No Country</div>
                            <div className='workspace-item-description'>
                                <div className='workspace-item-members-avatars'>avatars</div>
                                <div className='workspace-item-members-count'>11.954 members</div>
                            </div>
                        </div>
                        <div className='workspace-item-open'>Open</div>
                    </div>

                </div>
            </div>
            <div className='create-workspace-section'></div>
        </div>
    )
}

export default LoggedBody