import React, { useEffect, useState } from 'react'
import './MobileChannelList.css'
import MobileChannelListBtn from './../MobileChannelListBtn/MobileChannelListBtn';
import MobileChannelListItem from '../MobileChannelListItem/MobileChannelListItem';
import ENVIROMENT from '../../config/enviroment.config';
import { useParams } from 'react-router-dom';

const MobileChannelList = () => {

    const { workspace_id } = useParams()

    // API Response
    const initialApiResponseState = {
        loading: false,
        error: null,
        data: null
    }

    const [apiResponse, setApiResponse] = useState(initialApiResponseState)

    // Fetch Channels
    useEffect(() => {

        const fetchChannels = async () => {
            try {
                // Set API Response Loading to true
                setApiResponse((prevState) => {
                    return { ...prevState, loading: true }
                })

                // Get Auth Token
                const token = sessionStorage.getItem("authorization_token")

                // Response
                const response = await fetch(
                    ENVIROMENT.URL_API + `/api/channel/${workspace_id}/channels`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })

                // Response Data to JSON
                const responseData = await response.json()

                // Set API Response Data
                if (responseData.ok) {
                    setApiResponse((prevState) => {
                        return { ...prevState, data: responseData }
                    })
                } else {
                    window.location.href = '/login';
                }


            } catch (error) {
                // Set API Error
                setApiResponse((prevState) => {
                    if (error.status) {
                        return { ...prevState, error: error.message }
                    } else {
                        return { ...prevState, error: `Something went wrong${error}` }
                    }
                })
            }

            finally {
                // Set API Response Loading to false
                setApiResponse((prevState) => {
                    return { ...prevState, loading: false }
                })
            }
        }

        fetchChannels()
    }, [])


    return (
        <div className='mobile-workspace-body-channels-list'>
            <MobileChannelListBtn name='Channels' />
            <ul className='mobile-workspace-body-channels-list-container'>
                {apiResponse.data?.payload?.channels.map((channel, index) => (<MobileChannelListItem channelName={channel.name} channelId={channel._id} key={index} />))}
                <li className='mobile-workspace-body-channels-list-item'>+ Add channel</li>
            </ul>
        </div>
    )
}

export default MobileChannelList