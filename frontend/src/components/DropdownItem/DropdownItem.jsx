import React from 'react'
import './DropdownItem.css'
import { PiHash } from "react-icons/pi";
import { useNavigate, useParams } from 'react-router-dom';

const DropdownItem = ({ name, id }) => {
    const navigate = useNavigate()
    const params = useParams()

    const handleClick = () => {
        navigate(`/workspace/${params.workspace_id}/channel/${id}`)
    }


    return (
        <li className='dropdown-menu-list-item' onClick={handleClick}>
            <PiHash className='dropdown-menu-list-item-icon' />
            <div className='dropdown-menu-list-item-name'>{name}</div>
        </li>
    )
}

export default DropdownItem