import React from 'react'
import './LoggedBody.css'
import WorkspaceItem from './../WorkspaceItem/WorkspaceItem';



const LoggedBody = () => {
    return (
        <div className='logged-body'>
            <div className='logged-body-title'>
                <h1 className='logged-body-title-text'><span className='logged-body-title-text-highlight'>Welcome back!</span> Stay hydrated!</h1>
                <span className='logged-body-title-description'>Choose a workspace below to get back to working with your team.</span>
            </div>
            <div className='workspace-list'>
                <WorkspaceItem />
            </div>
            <div className='create-workspace-section'></div>
        </div>
    )
}

export default LoggedBody