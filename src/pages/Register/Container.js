import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { register } from 'minesweeper-api-client'
import Register from './Register'

import './styles.scss'

const Container = ({ changeToken, showSuccess, showError }) => {
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')

  const [usernameValidationError, setUsernameValidationError] = useState(false)
  const [passwordValidationError, setPasswordValidationError] = useState(false)

  const onUsernameChange = (e) => setUsername(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)
  const onPasswordConfirmationChange = (e) => setPasswordConfirmation(e.target.value)

  const onSubmit = async () => {
    const { token, message, errors } = await register({ username, password, password_confirmation })

    if (token) {
      showSuccess(message)

      changeToken(token)

      history.push('/')
    } else {
      if (errors.password) {
        setPasswordValidationError(true)

        showError(errors.password[0])
      }

      if (errors.username) {
        setUsernameValidationError(true)

        showError(errors.username[0])
      }
    }
  }

  const onGoToLogin = () => history.push('/login')

  const fields = {
    username: {
      value: username,
      label: 'Username',
      onChange: onUsernameChange,
      error: usernameValidationError
    },
    password: {
      type: 'password',
      value: password,
      label: 'Password',
      onChange: onPasswordChange,
      error: passwordValidationError
    },
    passwordConfirmation: {
      type: 'password',
      value: password_confirmation,
      label: 'Confirm Password',
      onChange: onPasswordConfirmationChange,
      error: passwordValidationError
    },
  }

  return <Register {...{ fields, onSubmit, onGoToLogin }} />
}

export default Container
