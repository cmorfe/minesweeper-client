import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from './actions';
import Register from './Register';

import './styles.scss';

const Container = ({ changeToken, showSuccess, showError }) => {
    let history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState('');
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
    const [usernameValidationError, setUsernameValidationError] = useState(false);
    const [passwordValidationError, setPasswordValidationError] = useState(false);

    const onUsernameChange = (e) => setUsername(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);
    const onValidationChange = (e) => setValidation(e.target.value);

    const onSubmit = async () => {
        let errors = false;

        setPasswordConfirmationError(validation !== password);

        if (validation !== password) {
            showError('The passwords do no match');
            errors = true;
        }

        setUsernameValidationError(username.length < 1);

        if (username.length < 1) {
            showError('Username field is required.');
            errors = true;
        }

        setPasswordValidationError(password.length < 1);

        if (password.length < 1) {
            showError('Password field is required.');
            errors = true;
        }

        if (errors) {
            return;
        }

        const { token, errorMsg } = await register({ username, password, validation });

        if (token) {
            showSuccess('User created successfully');
            changeToken(token);
            history.push('/');
        } else {
            showError(errorMsg);
        }
    };

    const onGoToLogin = () => history.push('/login');

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
        validation: {
            type: 'password',
            value: validation,
            label: 'Confirm Password',
            onChange: onValidationChange,
            error: passwordConfirmationError
        },
    };

    return <Register {...{ fields, onSubmit, onGoToLogin }} />;
}

export default Container;