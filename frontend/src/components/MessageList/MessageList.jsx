import React, { useEffect, useState } from 'react'
import './MessageList.css'
import { useParams } from 'react-router-dom'
import ENVIROMENT from '../../config/enviroment.config'

const MessageList = () => {
    // API Response
    const initialApiResponseState = {
        loading: false,
        error: null,
        data: null
    }

    const [apiResponse, setApiResponse] = useState(initialApiResponseState)

    const { channel_id } = useParams()


    useEffect(() => {
        const fetchChannelMessages = async () => {
            try {
                // Set API Response Loading to true
                setApiResponse((prevState) => {
                    return { ...prevState, loading: true }
                })

                // Get Auth Token
                const token = sessionStorage.getItem("authorization_token")

                // Response
                const response = await fetch(
                    ENVIROMENT.URL_API + `/api/channel//${channel_id}/messages`,
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

        fetchChannelMessages()
    }, [channel_id])


    const MessageJsx = apiResponse.data?.payload.messages.map((message, index) => {
        return (
            <div className='workspace-message-area-message' key={index}>{message.content}</div>
        )
    })

    return (
        <div className='workspace-message-area-message-list'>
            {MessageJsx}
        </div>
    )
}

export default MessageList