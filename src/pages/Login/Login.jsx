import React from 'react'
import { Button, TextField } from '@material-ui/core'

const Login = ({ fields, onSubmit, onGoToRegister }) => (
  <div className="login-page">
    <div className="form">
      <TextField {...fields.username} />
      <TextField {...fields.password} />
    </div>
    <div className="buttons">
      <Button variant="contained" color="primary" onClick={onSubmit}>
        {'Login'}
      </Button>
      <Button variant="contained" onClick={onGoToRegister}>
        {'Register'}
      </Button>
    </div>
  </div>
)

export default Login
