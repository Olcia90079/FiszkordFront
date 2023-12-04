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

const SignIn = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

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

            const response = await axios.post('/api/auth/login', {
                email: userEmail,
                password: userPassword,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                {errors.userEmail && <p className="error-message">{errors.userEmail}</p>}
            </div>
            <div className="input-group">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />
                <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'}
                </button>
                {errors.userPassword && <p className="error-message">{errors.userPassword}</p>}
            </div>
            <button className="sign-in-button" onClick={handleSignIn}>
                Sign In
            </button>
        </div>
    );
};

export default SignIn;

