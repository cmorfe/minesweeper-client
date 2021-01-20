import React from 'react';
import { TextField, Button } from "@material-ui/core";

const Login = ({ fields, onSubmit, onGoToRegister }) => (
  <div className="login-page">
    <div className="form">
      <TextField {...fields.username} variant="outlined" />
      <TextField {...fields.password} variant="outlined" />
    </div>
    <div className="buttons">
      <Button variant="contained" color="primary" onClick={onSubmit}>
        {"Login"}
      </Button>
      <Button variant="contained" onClick={onGoToRegister}>
        {"Register"}
      </Button>
    </div>
  </div>
);

export default Login;
