import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { RiHome2Fill } from "react-icons/ri";
import { TbBrandWechat } from "react-icons/tb";
import { HiOutlineBell } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { FaRedditSquare } from "react-icons/fa"; // Provisorio
import { FaCirclePlus } from "react-icons/fa6";
import ENVIROMENT from '../../config/enviroment.config';




const Navbar = ({ handleClick }) => {
    const initialUserApiResponse = {
        loading: false,
        error: null,
        data: null,

    }

    const [apiResponseUserInfo, setApiResponseUserInfo] = useState(initialUserApiResponse)

    async function fetchUserInfo() {  // ← Nombre descriptivo
        try {
            setApiResponseUserInfo(prev => ({ ...prev, loading: true }));

            const response = await fetch(
                ENVIROMENT.URL_API + "/api/auth/me",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("authorization_token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const responseData = await response.json();

            if (responseData.ok) {
                setApiResponseUserInfo(prev => ({ ...prev, data: responseData }));
            }

        } catch (error) {
            setApiResponseUserInfo(prev => ({ ...prev, error: error }));
        } finally {
            setApiResponseUserInfo(prev => ({ ...prev, loading: false }));
        }
    }

    useEffect(() => {
        fetchUserInfo()
    }, [])

    return (
        <div className='navbar'>
            <div className='navbar-icons'>
                <button className='navbar-icon-button' type="button">
                    <div className='navbar-icon-container'>
                        <img
                            src={apiResponseUserInfo.data?.payload?.user?.profile_image}
                            alt=""
                            className='navbar-icon'
                        />
                    </div>
                </button>
                <button className='navbar-icon-button' type="button">
                    <div className='navbar-icon-container'>
                        <RiHome2Fill className='navbar-icon' />
                    </div>
                    <span className='navbar-icon-text'>Home</span>
                </button>
                <button className='navbar-icon-button' type="button">
                    <div className='navbar-icon-container'>
                        <TbBrandWechat className='navbar-icon' />
                    </div>
                    <span className='navbar-icon-text'>DMs</span>
                </button>
                <button className='navbar-icon-button' type="button">
                    <div className='navbar-icon-container'>
                        <HiOutlineBell className='navbar-icon' />
                    </div>
                    <span className='navbar-icon-text'>Activity</span>
                </button>
                <button className='navbar-icon-button' type="button">
                    <div className='navbar-icon-container'>
                        <BsThreeDots className='navbar-icon' />
                    </div>
                    <span className='navbar-icon-text'>More</span>
                </button>
            </div>
            <div className='navbar-icons'>
                <div className="navbar-icon-container">
                    <FaCirclePlus className='navbar-icon' />
                </div>
                <div className="navbar-icon-container" onClick={handleClick}>
                    <img
                        src={apiResponseUserInfo.data?.payload?.user?.profile_image}
                        alt=""
                        className='navbar-icon'
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar