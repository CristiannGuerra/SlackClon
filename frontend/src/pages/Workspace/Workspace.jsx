import React, { useEffect, useState } from 'react'
import './Workspace.css'
import { useParams } from 'react-router-dom'
import ENVIROMENT from './../../config/enviroment.config';
import { Toolbar, Navbar } from '../../components';

const Workspace = () => {
    // API Response
    const initialApiResponseState = {
        loading: false,
        error: null,
        data: null
    }

    const [apiResponse, setApiResponse] = useState(initialApiResponseState)

    // Tomamos el id del workspace de la url
    const { workspace_id } = useParams()

    // Fetch Workspace
    useEffect(() => {
        const fetchWorkspace = async () => {
            try {
                // Set API Response Loading to true
                setApiResponse((prevState) => {
                    return { ...prevState, loading: true }
                })

                // Get Auth Token
                const token = sessionStorage.getItem("authorization_token")

                // Response
                const response = await fetch(
                    ENVIROMENT.URL_API + `/api/workspace/${workspace_id}`,
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

        fetchWorkspace()
    }, [])

    console.log(apiResponse)

    console.log(apiResponse.data?.payload.workspace.name); // No arrojará error si data es null/undefined

    return (
        <div className='workspace'>
            <Toolbar workspaceName={apiResponse.data?.payload.workspace.name} />
            <div className='workspace-container'>
                <Navbar />
                <div className='workspace-sidebar'>
                    <div className='workspace-sidebar-channels-list'></div>
                    <div className='workspace-sidebar-direct-messages-list'></div>
                </div>
                <div className='workspace-message-area'>
                    <div className='workspace-message-area-message-list'></div>
                    <div className='workspace-message-area-message-input'></div>
                </div>
            </div>

            {/* 
            Toolbar
            Navbar
            Sidebar => ChannelsList
                    => DirectMessagesList
            MessageArea => MessageList
                        => MessageInput
            */}
        </div>
    )
}

export default Workspace