import React, { useEffect, useState } from 'react'
import './Workspace.css'
import { Link, useParams } from 'react-router-dom'
import ENVIROMENT from './../../config/enviroment.config';
import { Toolbar, Navbar, Channel, ChannelList, UserInfo } from '../../components';
import { IoCreateOutline } from "react-icons/io5";
import { PiChatCircleTextLight } from "react-icons/pi";
import { MdOutlineHeadset } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import MemberListItem from '../../components/MemberListItem/MemberListItem';


const Workspace = () => {
    // UserInfo Container State
    const [isVisible, setIsVisible] = useState(false);

    // Handle Profile Click
    const handleProfileClick = () => {
        setIsVisible(!isVisible);
    }

    // API Response
    const initialApiResponseState = {
        loading: false,
        error: null,
        data: null
    }

    const [apiResponse, setApiResponse] = useState(initialApiResponseState)

    // Tomamos el id del workspace de la url
    const { workspace_id, channel_id } = useParams()

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


    // Members List
    const membersJsx = apiResponse.data?.payload.workspace.members.map((member, index) => {
        return (
            <MemberListItem name={member.username} id={member._id} key={index} />
        )
    })


    return (

        <div className='workspace'>

            {/* Loader de Carga */}
            {apiResponse.loading && <div className='workspace-loader'>Loading...</div>}

            {/* API Response */}
            {apiResponse.data && (
                <>
                    <Toolbar workspaceName={apiResponse.data?.payload.workspace.name} />
                    <div className='workspace-container'>
                        <Navbar handleClick={handleProfileClick} />
                        <div className='workspace-sidebar'>
                            <div className='workspace-sidebar-header'>
                                <Link className='workspace-sidebar-header-name' to="/workspaces">{apiResponse.data?.payload.workspace.name}</Link>
                                <IoCreateOutline className='workspace-sidebar-header-icon' />
                            </div>
                            <div className='workspace-sidebar-actions' >
                                <div className='workspace-sidebar-action'>
                                    <PiChatCircleTextLight className='workspace-sidebar-action-icon' />
                                    <div className='workspace-sidebar-action-text'>Threads</div>
                                </div>
                                <div className='workspace-sidebar-action'>
                                    <MdOutlineHeadset className='workspace-sidebar-action-icon' />
                                    <div className='workspace-sidebar-action-text'>Huddles</div>
                                </div>
                            </div>
                            <ChannelList />
                            <div className='workspace-sidebar-channels-list'>
                                <button className='dropdown-menu-button' type="button">
                                    <IoMdArrowDropdown className='dropdown-menu-button-icon' />
                                    <div className='dropdown-menu-button-text'>Members</div>
                                </button>
                                <div className='dropdown-menu'>
                                    <ul className='dropdown-menu-list' >
                                        {membersJsx}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Channel Messages */}
                        {!channel_id
                            ? <div className='channel-not-selected' ></div>
                            : <Channel />}
                        {
                            isVisible && <UserInfo isVisible={isVisible} onClose={handleProfileClick} />
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default Workspace