import React, { useContext } from 'react'
import { useApiRequest, useForm } from '../../hooks'
import ENVIROMENT from '../../config/enviroment.config'
import { AuthContext } from '../../Context/AuthContext'

const LoginScreen = () => {
    const { login } = useContext(AuthContext)

    const formInitialState = {
        email: '',
        password: ''
    }

    const { formState, handleInput } = useForm(formInitialState)

    const { apiResponse, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/login')


    const handleSubmit = async (e) => {
        e.preventDefault()
        await postRequest(formState)
        login(apiResponse.data.payload.autorizathion_token)
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required value={formState.email}
                        onChange={handleInput} /></div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id='password'
                        name='password'
                        required value={formState.password}
                        onChange={handleInput} /></div>
                {apiResponse.error && <p>{apiResponse.error}</p>}
                {apiResponse.loading
                    ? <span>Loading...</span>
                    : <button type="submit">Login</button>}

            </form>
        </>
    )
}

export default LoginScreen