import React, { useEffect, useState } from 'react'
import './ChannelList.css'
import DropdownItem from '../DropdownItem/DropdownItem'
import { IoMdArrowDropdown } from "react-icons/io";
import CreateChannelModal from '../CreateChannelModal/CreateChannelModal';
import ENVIROMENT from '../../config/enviroment.config';
import { useParams } from 'react-router-dom';
// import { FaPlusSquare } from "react-icons/fa";
import { GoPlus } from "react-icons/go";

const ChannelList = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const { workspace_id } = useParams()

    // API Response
    const initialApiResponseState = {
        loading: false,
        error: null,
        data: null
    }

    const [apiResponse, setApiResponse] = useState(initialApiResponseState)

    const fetchCreateChannel = async (formState) => {
        try {
            const response = await fetch(
                ENVIROMENT.URL_API + `/api/channel/${workspace_id}/channels`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('authorization_token')}`
                    },
                    body: JSON.stringify(formState)
                }
            )

            if (response.ok) {
                const newChannel = await response.json();
                setApiResponse((prevState) => ({
                    ...prevState,
                    data: {
                        ...prevState.data,
                        payload: {
                            ...prevState.data.payload,
                            channels: [
                                ...prevState.data.payload.channels,
                                newChannel.payload.channel
                            ]
                        }
                    }
                }));


            }


        } catch (error) {
            console.error('Error creating channel:', error);

        }
    }


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


    const channelsJsx = apiResponse.data?.payload?.channels.map((channel, index) => {
        return (
            <DropdownItem name={channel.name} id={channel._id} key={index} />
        )
    })

    return (
        <div className='workspace-sidebar-channels-list'>
            <button className='dropdown-menu-button' type="button">
                <IoMdArrowDropdown className='dropdown-menu-button-icon' />
                <div className='dropdown-menu-button-text'>Channels</div>
            </button>
            <div className='dropdown-menu'>
                <ul className='dropdown-menu-list' >
                    {channelsJsx}
                </ul>
            </div>
            <button className='workspace-sidebar-channels-list-add-channels-button' type="button" onClick={() => setIsModalOpen(true)}>
                <GoPlus className='workspace-sidebar-channels-list-add-channels-button-icon' />
                <div className='workspace-sidebar-channels-list-add-channels-button-text'>
                    Add channels
                </div>
            </button>
            <CreateChannelModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={fetchCreateChannel} />
        </div>
    )
}

export default ChannelList