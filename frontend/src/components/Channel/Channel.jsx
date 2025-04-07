import React, { useCallback, useEffect, useState } from 'react'
import MessageList from '../MessageList/MessageList'
import MessageInput from '../MessageInput/MessageInput'
import { useParams } from 'react-router-dom';
import ENVIROMENT from '../../config/enviroment.config';
import './Channel.css'
import { TbMessageCircleFilled } from "react-icons/tb";
import { PiSticker } from "react-icons/pi";
import { IoFolderOutline } from "react-icons/io5";
import { BsStack } from "react-icons/bs";

const Channel = () => {
    const [messages, setMessages] = useState([]);
    const [channelInfo, setChannelInfo] = useState(null);
    const { workspace_id, channel_id } = useParams();


    const fetchChannelData = useCallback(async () => {
        try {
            const [messagesRes, channelRes] = await Promise.all([
                fetch(
                    ENVIROMENT.URL_API + `/api/channel/${channel_id}/messages`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${sessionStorage.getItem('authorization_token')}`
                        },
                    }
                ),
                fetch(
                    ENVIROMENT.URL_API + `/api/channel/${workspace_id}/channels/${channel_id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${sessionStorage.getItem('authorization_token')}`
                        },
                    }
                )


            ])

            if (!messagesRes.ok || !channelRes.ok) throw new Error('Error fetching data');

            const [messagesData, channelData] = await Promise.all([
                messagesRes.json(),
                channelRes.json()
            ]);

            setMessages(messagesData.payload.messages);
            setChannelInfo(channelData.payload.channel);


        } catch (error) {
            console.error('Error:', error);
        }
    }, [channel_id])

    useEffect(() => {
        const abortController = new AbortController();
        fetchChannelData();
        return () => abortController.abort();
    }, [fetchChannelData])

    console.log(channelInfo)


    return (
        <div className='workspace-message-area'>
            <div className='workspace-message-area-header'>
                <div className='workspace-message-area-header-channel'>
                    <div className='workspace-message-area-header-channel-name'>
                        {channelInfo ? `# ${channelInfo.name}` : ''}
                    </div>
                    <div className='workspace-message-area-header-channel-info'>
                        <div className='workspace-message-area-header-channel-members'> {channelInfo ? channelInfo.workspace_ref.members.length : ''} Members</div>
                    </div>
                </div>
                <div className='workspace-message-area-header-actions' >
                    <div className='workspace-message-area-header-actions-button'>
                        <TbMessageCircleFilled className='workspace-message-area-header-actions-button-icon' />
                        <div className='workspace-message-area-header-actions-button-text'>Messages</div>
                    </div>
                    <div className='workspace-message-area-header-actions-button'>
                        <PiSticker className='workspace-message-area-header-actions-button-icon' />
                        <div className='workspace-message-area-header-actions-button-text'>Canvas</div>
                    </div>
                    <div className='workspace-message-area-header-actions-button'>
                        <IoFolderOutline className='workspace-message-area-header-actions-button-icon' />
                        <div className='workspace-message-area-header-actions-button-text'>Bookmarks</div>
                    </div>
                    <div className='workspace-message-area-header-actions-button'>
                        <BsStack className='workspace-message-area-header-actions-button-icon' />
                        <div className='workspace-message-area-header-actions-button-text'>Files</div>
                    </div>
                </div>
            </div>
            <MessageList messages={messages} />
            {channelInfo && (
                <MessageInput channel_name={channelInfo.name} onMessageSent={fetchChannelData} />
            )}

        </div>
    )
}

export default Channel