import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './MobileChannel.css';
import ENVIROMENT from '../../config/enviroment.config';
import { FaArrowLeft } from 'react-icons/fa6';
import { MdOutlineHeadset } from 'react-icons/md';
import { PiHash } from 'react-icons/pi';
import MobileMessageList from '../MobileMessageList/MobileMessageList';
import MobileMessageInput from '../MobileMessageInput/MobileMessageInput';

const MobileChannel = () => {
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


  return (
    <div className='mobile-channel'>
      {/* Header */}
      <div className='mobile-channel-header'>
        <FaArrowLeft className='mobile-channel-header-icon' />
        <div className='mobile-channel-header-info-container'>
          <PiHash className='mobile-channel-header-info-icon' />
          <div className='mobile-channel-header-info'>
            <div className='mobile-channel-header-info-name'>{channelInfo?.name}</div>
            <div className='mobile-channel-header-info-members'>{channelInfo ? channelInfo.workspace_ref.members.length : ''} Members</div>
          </div>
        </div>
        <MdOutlineHeadset className='mobile-channel-header-icon' />
      </div>

      {/* Body */}
      <MobileMessageList messages={messages} />

      {/* Footer */}
      <MobileMessageInput channel_name={channelInfo?.name} onMessageSent={fetchChannelData} />
    </div>
  )
}

export default MobileChannel