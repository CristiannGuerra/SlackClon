import React, { useEffect, useState } from 'react'
import ENVIROMENT from '../../config/enviroment.config'
import "./UserInfo.css"
import { IoMailOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";

const UserInfo = ({ isVisible, onClose }) => {

    const [hora, setHora] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => {
            setHora(new Date());
        }, 1000);

        return () => clearInterval(timerID); // Limpia el intervalo al desmontar
    }, []);


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
    }, [isVisible])


    return (
        <div className='user-info-container'>
            {/* Sección de Perfil */}
            <div className='profile-header'>
                <div className='profile-title'>Profile</div>
                <button className='close-btn' onClick={onClose}>X</button>
            </div>
            <div className='profile-section'>
                <div className='profile-img-container'>
                    <img className='profile-img'
                        src={apiResponseUserInfo.data?.payload?.user?.profile_image}
                        alt="Profile Picture"
                    />
                </div>

                <div className='profile-name-section'>
                    <div className='user-name'>{apiResponseUserInfo.data?.payload?.user?.username}</div>
                    <a href="#" className='edit-profile-link'>Edit</a>
                </div>

                <a href="#" className='add-pronunciation-link'>
                    {/* <div className='add-icon'></div> */}
                    <div className='add-text'>+ Add name pronunciation</div>
                </a>

                <div className='local-time-container'>
                    <CiClock2 className='clock-icon' />
                    <span className='time-text'>{`${hora.toLocaleTimeString()} Local time`}</span>
                </div>

                <div className='action-buttons'>
                    <button className='status-btn'>Set a status</button>
                    <button className='view-as-btn'>View as</button>
                    <button className='more-options-btn'>:</button>
                </div>
            </div>

            {/* Sección de Contacto */}
            <div className='contact-section'>
                <div className='contact-header'>
                    <div className='contact-title'>Contact information</div>
                    <a href="#" className='edit-contact-link'>Edit</a>
                </div>

                <div className='contact-item'>
                    <IoMailOutline className='contact-icon' />
                    <div className='contact-info'>
                        <span className='contact-label'>Email address</span>
                        <a href="#" className='contact-email'>{apiResponseUserInfo.data?.payload?.user?.email}</a>
                    </div>
                </div>

                <a href="#" className='add-phone-link'>
                    <div className='add-text'>+ Add phone</div>
                </a>
            </div>

            {/* Sección Acerca de */}
            <div className='about-section'>
                <div className='about-header'>
                    <div className='about-title'>About me</div>
                    <a href="#" className='edit-about-link'>Edit</a>
                </div>

                <a href="#" className='add-date-link'>
                    <div className='add-text'>+ Add date</div>
                </a>
            </div>
        </div>
    )
}

export default UserInfo