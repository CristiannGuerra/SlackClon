import React from 'react'
import "./Navbar.css"
import { RiHome2Fill } from "react-icons/ri";
import { TbBrandWechat } from "react-icons/tb";
import { HiOutlineBell } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { FaRedditSquare } from "react-icons/fa"; // Provisorio
import { FaCirclePlus } from "react-icons/fa6";


const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navbar-icons'>
                <button className='navbar-icon-button' type="button">
                    <div className='navbar-icon-container'>
                        <FaRedditSquare className='navbar-icon' />
                    </div>
                    <span className='navbar-icon-text'>Inicio</span>
                </button>
                <button className='navbar-icon-button' type="button">
                    <div className='navbar-icon-container'>
                        <RiHome2Fill className='navbar-icon' />
                    </div>
                    <span className='navbar-icon-text'>Inicio</span>
                </button>
                <button className='navbar-icon-button' type="button">
                    <div className='navbar-icon-container'>
                        <TbBrandWechat className='navbar-icon' />
                    </div>
                    <span className='navbar-icon-text'>Mensajes directos</span>
                </button>
                <button className='navbar-icon-button' type="button">
                    <div className='navbar-icon-container'>
                        <HiOutlineBell className='navbar-icon' />
                    </div>
                    <span className='navbar-icon-text'>Actividad</span>
                </button>
                <button className='navbar-icon-button' type="button">
                    <div className='navbar-icon-container'>
                        <BsThreeDots className='navbar-icon' />
                    </div>
                    <span className='navbar-icon-text'>Mas</span>
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