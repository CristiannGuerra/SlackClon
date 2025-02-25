import React, { useEffect } from 'react'
import { useApiRequest, useForm } from '../../hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'

const RewritePasswordScreen = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams(window.location.search)

  const reset_token = searchParams.get('reset_token')

  useEffect(() => {
    if (!reset_token) {
      navigate('/')
    }
  }, [])

  const formInitialState = {
    password: ''
  }

  const { formState, handleInput } = useForm(formInitialState)

  const { apiResponse, putRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/rewrite-password')

  useEffect(() => {
    if (apiResponse.data) {
      navigate('/login')
    }
  }, [apiResponse])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await putRequest({ password: formState.password, reset_token })
  }


  return (
    <>
      <h1>Rewrite Password</h1>
      <form>
        <label htmlFor="password">Enter your new password</label>
        <input type="text" id='password' name='password' value={formState.password} onChange={handleInput} />
        <button type="button" onSubmit={handleSubmit}>Submit</button>
      </form>
    </>
  )
}

export default RewritePasswordScreen