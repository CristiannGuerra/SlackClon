import React, { useEffect, useState } from 'react'
import './LoggedBody.css'
import ENVIROMENT from '../../config/enviroment.config';
import WorkspaceItem from '../WorkspaceItem/WorkspaceItem';
import { Link } from 'react-router-dom';



const LoggedBody = () => {
    const initialApiResponseState = {
        loading: false,
        error: null,
        data: null
    }

    const [apiResponse, setApiResponse] = useState(initialApiResponseState)


    useEffect(() => {
        // Fetch API Response
        const fetchWorkspaces = async () => {
            try {
                // Set API Response Loading to true
                setApiResponse(() => {
                    return { ...initialApiResponseState, loading: true }
                })

                // Get Auth Token
                const token = sessionStorage.getItem("authorization_token")

                // Response
                const response = await fetch(
                    ENVIROMENT.URL_API + '/api/workspace',
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })

                // Response Data to JSON
                const responseData = await response.json()

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
                        return { ...prevState, error: 'Something went wrong' }
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

        fetchWorkspaces()
    }, [])

    let workspaceJsx = apiResponse.data?.payload.workspaces.map((workspace, index) => <WorkspaceItem id={workspace._id} key={index} name={workspace.name} members={workspace.members} />)

    return (
        <div className='logged-body'>
            <div className='logged-body-title'>
                <h1 className='logged-body-title-text'><span className='logged-body-title-text-highlight'>Welcome back!</span> Stay hydrated!</h1>
                <span className='logged-body-title-description'>Choose a workspace below to get back to working with your team.</span>
            </div>
            <div className='workspace-list'>
                {workspaceJsx}
            </div>
            <div className='create-workspace-section'>
                <div className='create-workspace'>
                    <img className='create-workspace-img' src="https://a.slack-edge.com/bv1-13/get-started-workspaces-icon-88e0cb1.svg" alt="" />
                    <div className='create-workspace-text'>¿Quieres usar Slack con otro equipo?</div>
                </div>
                <div className='create-workspace-button-container'>
                    <Link className='create-workspace-button' to="/create-workspace">Crear otro espacio de trabajo</Link>
                </div>
            </div>
        </div>
    )
}

export default LoggedBody