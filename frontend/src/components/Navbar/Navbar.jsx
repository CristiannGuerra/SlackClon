import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { RiHome2Fill } from "react-icons/ri";
import { TbBrandWechat } from "react-icons/tb";
import { HiOutlineBell } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { FaRedditSquare } from "react-icons/fa"; // Provisorio
import { FaCirclePlus } from "react-icons/fa6";
import ENVIROMENT from '../../config/enviroment.config';



const Navbar = () => {

    // const [apiResponse, setApiResponse] = useState({ data: null })

    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         const response = await fetch(
    //             ENVIROMENT.URL_API + `/api/auth/me`,
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': `Bearer ${sessionStorage.getItem('authorization_token')}`,
    //                     'Content-Type': 'application/json'
    //                 }
    //             })

    //         // Response Data to JSON
    //         const responseData = await response.json()

    //         // Set API Response Data
    //         if (responseData.ok) {
    //             setApiResponse((prevState) => {
    //                 return { ...prevState, data: responseData }
    //             })
    //         }
    //     }

    //     fetchUserInfo()
    // }, [])

    // console.log(apiResponse)




    return (
        <div className='navbar'>
            <div className='navbar-icons'>
                <button className='navbar-icon-button' type="button">
                    <div className='navbar-icon-container'>
                        <FaRedditSquare className='navbar-icon' />
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
                <div className="navbar-icon-container">
                    <FaRedditSquare className='navbar-icon' />
                </div>
            </div>
        </div>
    )
}

export default Navbar