import React from 'react'
import './MemberListItem.css'


const MemberListItem = ({ name, id }) => {

    return (
        <li className='dropdown-menu-list-item'>
            <div className='dropdown-menu-list-item-name'>{name}</div>
        </li>
    )
}

export default MemberListItem