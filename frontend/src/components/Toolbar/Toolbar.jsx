import React from 'react'
import './Toolbar.css'
import { FaArrowRight, FaArrowLeft, FaRegClock } from "react-icons/fa6";
import { IoSearchSharp, IoHelpCircleOutline } from "react-icons/io5";

const Toolbar = ({ workspaceName }) => {
    return (
        <div className='toolbar'>
            <div className='toolbar-arrows'>
                <FaArrowLeft />
                <FaArrowRight />
                <FaRegClock />
            </div>
            <div className='toolbar-search'>
                <input className='toolbar-search-input' type="text" placeholder={`Buscar en ${workspaceName}`} />
                <IoSearchSharp className='toolbar-search-icon' />
            </div>
            <div className='toolbar-help'>
                <IoHelpCircleOutline />
            </div>
        </div>
    )
}

export default Toolbar