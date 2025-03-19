import React from 'react'
import './WorkspaceItem.css'
import { FaArrowRight } from "react-icons/fa6";


const WorkspaceItem = () => {
    return (
        <a href='#' className='workspace-item'>
            <div className='workspace-item-avatar'>Logo</div>
            <div className='workspace-item-info-container'>
                <div className='workspace-item-info'>
                    <div className='workspace-item-name'>No Country</div>
                    <div className='workspace-item-description'>
                        <div className='workspace-item-members-avatars'>avatars</div>
                        <div className='workspace-item-members-count'>11.954 members</div>
                    </div>
                </div>                
                <FaArrowRight className='workspace-item-open' />
            </div>
        </a>
    )
}

export default WorkspaceItem