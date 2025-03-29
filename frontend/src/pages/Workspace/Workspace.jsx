import React, { useEffect, useState } from 'react'
import './Workspace.css'
import { useParams } from 'react-router-dom'
import ENVIROMENT from './../../config/enviroment.config';
import { Toolbar, Navbar, DropdownItem } from '../../components';
import { IoCreateOutline } from "react-icons/io5";
import { PiChatCircleTextLight } from "react-icons/pi";
import { MdOutlineHeadset } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";



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

    // No arrojará error si data es null/undefined
    // console.log(apiResponse.data?.payload.workspace.name)

    // Channels
    const channelsJsx = apiResponse.data?.payload.workspace.channels.map((channel, index) => {
        return (
            <DropdownItem channelName={channel.name} key={index} />
        )
    })


    // Membres
    const membersJsx = apiResponse.data?.payload.workspace.members.map((member, index) => {
        return (
            <DropdownItem channelName={member.username} key={index} />
        )
    })


    return (
        <div className='workspace'>
            <Toolbar workspaceName={apiResponse.data?.payload.workspace.name} />
            <div className='workspace-container'>
                <Navbar />
                <div className='workspace-sidebar'>
                    <div className='workspace-sidebar-header'>
                        <div className='workspace-sidebar-header-name'>Workspace name</div>
                        <IoCreateOutline className='workspace-sidebar-header-icon' />
                    </div>
                    <div className='workspace-sidebar-actions' >
                        <div className='workspace-sidebar-action'>
                            <PiChatCircleTextLight className='workspace-sidebar-action-icon' />
                            <div>Hilos de tus conversaciones</div>
                        </div>
                        <div className='workspace-sidebar-action'>
                            <MdOutlineHeadset className='workspace-sidebar-action-icon' />
                            <div>Juntas</div>
                        </div>
                    </div>
                    <div className='workspace-sidebar-channels-list'>
                        <button className='dropdown-menu-button' type="button">
                            <IoMdArrowDropdown className='dropdown-menu-button-icon' />
                            <div className='dropdown-menu-button-text'>Canales</div>
                        </button>
                        <div className='dropdown-menu'>
                            <ul className='dropdown-menu-list' >
                                {channelsJsx}
                            </ul>
                        </div>
                        <button className='dropdown-menu-button' type="button">
                            <IoMdArrowDropdown className='dropdown-menu-button-icon' />
                            <div className='dropdown-menu-button-text'>Miembros</div>
                        </button>
                        <div className='dropdown-menu'>
                            <ul className='dropdown-menu-list' >
                                {membersJsx}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='workspace-message-area'>
                    <div className='workspace-message-area-header'>
                        <div className='workspace-message-area-header-channel'>
                            <div className='workspace-message-area-header-channel-name'># general</div>
                            <div className='workspace-message-area-header-channel-info'>
                                <div className='workspace-message-area-header-channel-members'>Members</div>
                            </div>
                        </div>
                        <div className='workspace-message-area-header-actions' >
                            <div>Mensajes</div>
                            <div>Agregar canvas</div>
                            <div>Marcadores</div>
                            <div>Archivos</div>
                        </div>
                    </div>
                    <div className='workspace-message-area-message-list'>
                        <div className='workspace-message-area-message'>a</div>
                    </div>
                    <input className='workspace-message-area-message-input' type="text" name="" id="" />
                </div>
            </div>
        </div>
    )
}

export default Workspace