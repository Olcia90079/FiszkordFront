// POST /api/auth/login

// Logowanie. Wymagane body:

//     email: String
//     password: String

// Zwraca:

//     access_token: String
//     refresh_token: String

import React, { useState } from 'react';
import axios from 'axios';
import { validateSignInForm } from './validation';
import { login } from '../Store/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const SignIn = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const isLogged = useSelector(state => state.isLogged);

    const handleSignIn = async () => {
        try {
            const validationErrors = validateSignInForm({
                userEmail,
                userPassword,
            });

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: userEmail,
                password: userPassword,
            });

            const { access_token, refresh_token } = response.data;

            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token);

            dispatch(login());

            console.log(response);
            console.log("access_token: " + access_token);
            console.log("refresh_token: " + refresh_token);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {!isLogged && (
                <div className="container">
                <h2>Sign In</h2>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <button onClick={handleSignIn}>Sign In</button>
                </div>
            </div>)}
            {isLogged && (
                <div className="container">
                    <h2>Jesteś już zalogowany, czego tutaj szukasz? ;) </h2>
                </div>)}
        </>
    );
}

export default SignIn;

