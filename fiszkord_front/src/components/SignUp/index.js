// POST /api/auth/register

// Rejestracja. Wymagane body:

//     firstname: String
//     lastname: String
//     email: String
//     password: String
//     role: enum(USER, MANAGER, ADMIN)

// Zwraca:

//     access_token: String
//     refresh_token: String

import React, { useState } from 'react';
import axios from 'axios';
import { validateSignUpForm } from './validation';
import './SignUp.css';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSignUp = async () => {
        try {
            const validationErrors = validateSignUpForm({
                firstName,
                lastName,
                userEmail,
                userPassword,
            });

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            const response = await axios.post('http://localhost:8080/api/auth/register', {
                firstname: firstName,
                lastname: lastName,
                email: userEmail,
                password: userPassword,
                role: 'USER',
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Imię"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            </div>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Nazwisko"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
            </div>
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
                    placeholder="Hasło"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />
                <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'}
                </button>
                {errors.userPassword && <p className="error-message">{errors.userPassword}</p>}
            </div>
            <button className="sign-up-button" onClick={handleSignUp}>
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;
