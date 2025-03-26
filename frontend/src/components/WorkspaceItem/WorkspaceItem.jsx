import React from 'react'
import './WorkspaceItem.css'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom'

const WorkspaceItem = ({ name, members, id }) => {
    return (
        <Link to={`/workspace/${id}`} className='workspace-item'>
            <div className='workspace-item-avatar'>Logo</div>
            <div className='workspace-item-info-container'>
                <div className='workspace-item-info'>
                    <div className='workspace-item-name'>{name}</div>
                    <div className='workspace-item-description'>
                        <div className='workspace-item-members-avatars'>avatars</div>
                        <div className='workspace-item-members-count'>{members.length} members</div>
                    </div>
                </div>
                <FaArrowRight className='workspace-item-open' />
            </div>
        </Link>
    )
}

export default WorkspaceItem