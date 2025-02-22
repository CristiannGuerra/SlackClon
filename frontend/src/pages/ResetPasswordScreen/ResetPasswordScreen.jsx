import React from 'react'
import { useApiRequest, useForm } from '../../hooks'
import ENVIROMENT from '../../config/enviroment.config'

const ResetPasswordScreen = () => {
    // Initial State
    const formInitialState = {
        email: ''
    }

    // Custom Hook Form
    const { formState, handleInput } = useForm(formInitialState)

    // Custom Hook API Request
    const { apiResponse, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/reset-password')


    const handleSubmit = async (e) => {
        e.preventDefault()
        await postRequest(formState)
    }

    return (
        <>
            <h1>Reset Password</h1>
            <form>
                <label htmlFor="email"></label>
                <input
                    type="email"
                    name='email'
                    id='email'
                    value={formState.email}
                    onChange={handleInput} />
                {apiResponse.loading
                    ? <button disabled>Loading...</button>
                    : <button onClick={handleSubmit}>Reset Password</button>
                }
                {apiResponse.error && <span>{apiResponse.error}</span>}
                {apiResponse.data && <span>{apiResponse.data.message}</span>}

            </form>
        </>
    )
}

export default ResetPasswordScreen