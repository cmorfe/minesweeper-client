import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from './actions';
import Login from './Login';

import './styles.scss';

const Container = ({ changeToken, showError }) => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameChange = (e) => setUsername(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const onSubmit = async () => {
        const { token, errorMsg } = await login({ username, password });
        if (token) {
            changeToken(token);
            history.push('/');
        } else {
            showError(errorMsg);
        }
    };
    const onGoToRegister = () => history.push('/register');

    const fields = {
        username: {
            label: 'Username',
            value: username,
            placeholder: 'Username',
            onChange: onUsernameChange
        },
        password: {
            type: 'password',
            label: 'Password',
            value: password,
            placeholder: 'Password',
            onChange: onPasswordChange
        }
    }

    return <Login {...{ fields, onSubmit, onGoToRegister }} />
}

export default Container;
