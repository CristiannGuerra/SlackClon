import React from 'react'
import './MobileChannelListBtn.css'
import { IoMdArrowDropdown } from "react-icons/io";``

const MobileChannelListBtn = ({ name }) => {
    return (
        <button type="button" className='mobile-workspace-body-channels-list-button'>
            <div className='mobile-workspace-body-channels-list-text'>{name}</div>
            <IoMdArrowDropdown className='mobile-workspace-body-channels-list-icon' />
        </button>
    )
}

export default MobileChannelListBtn