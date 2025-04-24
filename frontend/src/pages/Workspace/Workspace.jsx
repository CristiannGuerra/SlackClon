import React, { useEffect, useState } from 'react'
import './Workspace.css'
import { Link, useParams } from 'react-router-dom'
import ENVIROMENT from './../../config/enviroment.config';
import { Toolbar, Navbar, Channel, ChannelList, UserInfo, MobileChannelList, MobileChannel } from '../../components';
import { IoBookmarkOutline, IoCreateOutline, IoFilterOutline, IoMicOutline, IoSearchSharp } from "react-icons/io5";
import { PiChatCircleTextLight } from "react-icons/pi";
import { MdOutlineHeadset } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import MemberListItem from '../../components/MemberListItem/MemberListItem';
import { useMediaQuery } from 'react-responsive'
import { RiHome2Fill } from 'react-icons/ri';
import { TbBrandWechat } from 'react-icons/tb';
import { HiOutlineBell } from 'react-icons/hi2';
import { BsThreeDots } from 'react-icons/bs';


const Workspace = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

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

            {/* Error */}
            {apiResponse.error && <div className='workspace-error'>{apiResponse.error}</div>}


            {(apiResponse.data && isTabletOrMobile && !channel_id) && (
                <div className='mobile-workspace'>
                    <div className='mobile-workspace-header'>
                        <div className='mobile-workspace-header-info'>
                            <div className='mobile-workspace-header-info-name'>
                                <div className='mobile-workspace-header-info-name-logo'></div>
                                <div className='mobile-workspace-header-info-name-text'>{apiResponse.data?.payload.workspace.name}</div>
                            </div>
                            <div className='mobile-workspace-header-info-avatar'></div>
                        </div>
                        <div className='mobile-workspace-header-tools'>
                            <div className='mobile-workspace-header-tools-search'>
                                <IoSearchSharp className='mobile-workspace-header-tools-search-icon' />
                                <input className='mobile-workspace-header-tools-search-input' type="text" placeholder='Buscar en' />
                                <IoMicOutline className='mobile-workspace-header-tools-mic-icon' />
                            </div>

                            <div className='mobile-workspace-header-tools-filter'>
                                <IoFilterOutline className='mobile-workspace-header-tools-filter-icon' />
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className='mobile-workspace-body'>
                        <div className='mobile-workspace-body-sidebar'>
                            <div className='mobile-workspace-body-sidebar-icons-container'>
                                <IoBookmarkOutline className='mobile-workspace-body-sidebar-icons-container-icon' />
                                <span className='mobile-workspace-body-sidebar-icons-container-text'>Later</span>
                                <span className='mobile-workspace-body-sidebar-icons-container-text'>0 items</span>
                            </div>
                            <div className='mobile-workspace-body-sidebar-icons-container' >
                                <VscSend className='mobile-workspace-body-sidebar-icons-container-icon fill' />
                                <span className='mobile-workspace-body-sidebar-icons-container-text'>Draft & Sent</span>
                                <span className='mobile-workspace-body-sidebar-icons-container-text'>0 items</span>
                            </div>
                            <div className='mobile-workspace-body-sidebar-icons-container'>
                                <MdOutlineHeadset className='mobile-workspace-body-sidebar-icons-container-icon fill' />
                                <span className='mobile-workspace-body-sidebar-icons-container-text'>Huddles</span>
                                <span className='mobile-workspace-body-sidebar-icons-container-text'>0 items</span>
                            </div>
                        </div>
                        {/* Channels */}
                        <MobileChannelList />
                        {/* Members */}
                        <div className='mobile-workspace-body-channels-list'>
                            <button type="button" className='mobile-workspace-body-channels-list-button'>
                                <div className='mobile-workspace-body-channels-list-text'>Members</div>
                                <IoMdArrowDropdown className='mobile-workspace-body-channels-list-icon' />
                            </button>
                            <ul className='mobile-workspace-body-channels-list-container'>
                                {apiResponse.data?.payload.workspace.members.map((member, index) => {
                                    return (
                                        <li className='mobile-workspace-body-channels-list-item' key={index}>{member.username}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className='mobile-workspace-footer'>
                        <div className='mobile-workspace-footer-icons-container'>
                            <RiHome2Fill className='mobile-workspace-footer-icon fill' />
                            <div className='mobile-workspace-footer-icon-text'>Home</div>
                        </div>
                        <div className='mobile-workspace-footer-icons-container'>
                            <TbBrandWechat className='mobile-workspace-footer-icon' />
                            <div className='mobile-workspace-footer-icon-text'>DMs</div>
                        </div>
                        <div className='mobile-workspace-footer-icons-container'>
                            <HiOutlineBell className='mobile-workspace-footer-icon' />
                            <div className='mobile-workspace-footer-icon-text'>Activity</div>
                        </div>
                        <div className='mobile-workspace-footer-icons-container'>
                            <BsThreeDots className='mobile-workspace-footer-icon fill' />
                            <div className='mobile-workspace-footer-icon-text'>More</div>
                        </div>
                    </div>
                </div>
            )
            }

            {(apiResponse.data && isTabletOrMobile && channel_id) && (
                <MobileChannel/>
            )}


            {/* Desktop Version */}
            {(apiResponse.data && !isTabletOrMobile) && (
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