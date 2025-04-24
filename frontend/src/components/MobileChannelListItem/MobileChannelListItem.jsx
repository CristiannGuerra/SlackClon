import React from 'react'
import './MobileChannelListItem.css'
import { useNavigate, useParams } from 'react-router-dom'

const MobileChannelListItem = ({ channelName, channelId }) => {
    const navigate = useNavigate()
    const params = useParams()

    const handleClick = () => {
        navigate(`/workspace/${params.workspace_id}/channel/${channelId}`)
    }


    return (
        <li
            className='mobile-workspace-body-channels-list-item'
            onClick={handleClick}
        ># {channelName}</li>
    )
}

export default MobileChannelListItem