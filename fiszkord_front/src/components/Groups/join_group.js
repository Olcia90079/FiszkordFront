// Dołączanie do grupy

//     POST /api/group/join

// Wymaga access token jako bearer token. Wymagane body:

//     code: String

import React, { useState } from 'react';
import axios from 'axios';
import './join_group.css';
import { useSelector } from 'react-redux';

const JoinGroup = () => {

    const [code, setCode] = useState("");

    const isLogged = useSelector(state => state.isLogged);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = axios.post('http://localhost:8080/api/group/join', {
                code: code
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            console.log(response);

            // Po dołączeniu do grupy, wyświetl w console.log() listę grup, do których należy użytkownik.

            // const response2 = axios.get('http://localhost:8080/api/group/user-groups', {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            //     },
            // });

            // console.log("response2");
            // console.log(response2);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {isLogged && (
                <div className="join-group-container">
                    <h1>Dołączanie do grupy</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Kod grupy:
                            <input type="text" name="code" onChange={e => setCode(e.target.value)} />
                        </label>
                        <input type="submit" value="Dołącz" />
                    </form>
                </div>)}
            {!isLogged && (
                <div className="container">
                    <h2>Powinieneś się najpierw zalogować lub zarejestrować, nie sądzisz? ;) </h2>
                </div>
            )}
        </>
    );
}

export default JoinGroup;