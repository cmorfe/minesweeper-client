import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

import {Home, Login, Register} from "./pages";

import "./App.scss";
import {useCookies} from "react-cookie";

const App = () => {
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    setToken(cookies['token']);
  }, []);

  const changeToken = (value) => {
    setToken(value);

    if (value) {
      setCookie('token', value);
    } else {
      removeCookie('token');
    }
  }

  const showSuccess = (msg) => {
    setMessage({type: "success", value: msg});
    setTimeout(() => setMessage(null), 5000);
  };

  const showError = (msg) => {
    setMessage({type: "error", value: msg});
    setTimeout(() => setMessage(null), 5000);
  };

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
              style={{textDecoration: "none"}}
              onClick={() => changeToken(null)}
            >
              {token ? "Logout" : "Login"}
            </Link>
          </div>
        </div>
        {
          message !== null
            ? <Alert severity={message.type}>{message.value}</Alert>
            : <></>
        }
        <div className={'container'}>
          <Switch>
            <Route path="/login">
              {
                token
                  ? <Redirect to={"/"}/>
                  : <Login {...{changeToken, showError}} />
              }
            </Route>
            <Route path="/register">
              {
                token
                  ? <Redirect to={"/"}/>
                  : <Register {...{showSuccess, showError}} />
              }
            </Route>
            <Route exact path="/">
              {
                !token
                  ? <Redirect to="/login"/>
                  : <Home {...{token, showSuccess, showError}} />
              }
            </Route>
            <Route path="*">
              <Redirect to="/"/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
