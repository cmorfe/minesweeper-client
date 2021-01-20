import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { Login, Register, Home } from "./pages";

import "./App.scss";

const App = () => {
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);

  const showSuccess = (msg) => {
    setMessage({ type: "success", value: msg });
    setTimeout(() => setMessage(null), 5000);
  };

  const showError = (msg) => {
    setMessage({ type: "error", value: msg });
    setTimeout(() => setMessage(null), 5000);
  };

  const logout = () => setToken(null);

  return (
    <Router>
      <div className="app">
        <div className="navbar">
          <div>
            <Typography variant="h6">{"Minesweeper"}</Typography>
          </div>
          <div>
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              onClick={logout}
            >
              {token ? "Logout" : "Login"}
            </Link>
          </div>
        </div>
        {message !== null ? (
          <Alert severity={message.type}>{message.value}</Alert>
        ) : (
          <></>
        )}
        <Switch>
          <Route path="/login">
            <Login {...{ setToken, showError }} />
          </Route>
          <Route path="/register">
            <Register {...{ showSuccess, showError }} />
          </Route>
          <Route exact path="/">
            {!token ? (
              <Redirect to="/login" />
            ) : (
              <Home {...{ token, showSuccess, showError }} />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
