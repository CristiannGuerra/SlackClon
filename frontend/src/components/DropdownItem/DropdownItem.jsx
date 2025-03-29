import React from 'react'
import './DropdownItem.css'
import { PiHash } from "react-icons/pi";

const DropdownItem = ({ channelName }) => {
    return (
        <li className='dropdown-menu-list-item'>
            <PiHash className='dropdown-menu-list-item-icon' />
            <div className='dropdown-menu-list-item-name'>{channelName}</div>
        </li>
    )
}

export default DropdownItem