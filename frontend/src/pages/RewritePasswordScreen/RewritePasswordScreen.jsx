import React from 'react'
import { useApiRequest, useForm } from '../../hooks'

const RewritePasswordScreen = () => {
  const formInitialState = {
    password: ''
  }

  const { formState, handleInput } = useForm(formInitialState)

  const { apiResponse, postRequest } = useApiRequest()


  return (
    <>
      <h1>Rewrite Password</h1>
      <form>
        <label htmlFor="password">Enter your new password</label>
        <input type="text" id='password' name='password' value={formState.password} onChange={handleInput} />
        <button type="button" /* onSubmit={ } */>Submit</button>
      </form>
    </>
  )
}

export default RewritePasswordScreen