import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from './actions';
import Register from './Register';

import './styles.scss';

const Container = ({ showSuccess, showError }) => {
    let history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState('');
    const [error, setError] = useState(false);

    const onUsernameChange = (e) => setUsername(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);
    const onValidationChange = (e) => setValidation(e.target.value);

    const onSubmit = async () => {
        if (validation !== password) {
            showError('The passwords do no match');
            setError(true);
            return;
        }

        const { errorMsg } = await register({ username, password });

        if (errorMsg) { 
            showError(errorMsg);
        }
        else {
            showSuccess('User created successfully');
            onGoToLogin();
        }
    };
    const onGoToLogin = () => history.push('/login');

    const fields = {
        username: {
            value: username,
            label: 'Username',
            onChange: onUsernameChange
        },
        password: {
            type: 'password',
            value: password,
            label: 'Password',
            onChange: onPasswordChange
        },
        validation: {
            type: 'password',
            value: validation,
            label: 'Confirm Password',
            onChange: onValidationChange,
            error
        },
    };

    return <Register {...{ fields, onSubmit, onGoToLogin }} />;
}

export default Container;