import React from "react";
import { TextField, Button } from "@material-ui/core";

const Register = ({ fields, onSubmit, onGoToLogin }) => (
  <div className="register-page">
    <div className="form">
      <TextField {...fields.username} />
      <TextField {...fields.password} />
      <TextField {...fields.validation} />
    </div>
    <div className="buttons">
      <Button onClick={onSubmit} color="primary" variant="contained">
        {"Register"}
      </Button>
      <Button onClick={onGoToLogin} variant="contained">
        {"Login"}
      </Button>
    </div>
  </div>
);

export default Register;
