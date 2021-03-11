import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { login } from 'minesweeper-api-client'
import Login from './Login'

import './styles.scss'

const Container = ({ changeToken, showError }) => {
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameValidationError, setUsernameValidationError] = useState(false)
  const [passwordValidationError, setPasswordValidationError] = useState(false)

  const onUsernameChange = (e) => setUsername(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)

  const onSubmit = async () => {
    const { token, message, errors } = await login({ username, password })

    if (token) {
      changeToken(token)

      history.push('/')
    } else if (errors) {
      if (errors.password) {
        setPasswordValidationError(true)

        showError(errors.password[0])
      }

      if (errors.username) {
        setUsernameValidationError(true)

        showError(errors.username[0])
      }
    } else {
      showError(message)
    }
  }

  const onGoToRegister = () => history.push('/register')

  const fields = {
    username: {
      label: 'Username',
      value: username,
      placeholder: 'Username',
      onChange: onUsernameChange,
      error: usernameValidationError
    },
    password: {
      type: 'password',
      label: 'Password',
      value: password,
      placeholder: 'Password',
      onChange: onPasswordChange,
      error: passwordValidationError
    }
  }

  return <Login {...{ fields, onSubmit, onGoToRegister }} />
}

export default Container
