// Tworzenie grupy

//     POST /api/group/create

// Wymaga access token jako bearer token. Wymagane body:

//     name: String
//     code: String

import React, { useState } from 'react';
import axios from 'axios';
import './create_group.css';
import { useSelector } from 'react-redux';

const CreateGroup = () => {

    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const isLogged = useSelector(state => state.isLogged);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(name);
        console.log(code);
        console.log(localStorage.getItem('access_token'));

        try {
            const response = await axios.post('http://localhost:8080/api/group/create', {
                name: name,
                code: code,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            console.log(response);

            // Po utworzeniu grupy, wyświetl w console.log() listę grup, do których należy użytkownik.

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
    };

    return (
        <>
            {isLogged && (
                <div className="create-group-container">
                    <h1>Tworzenie grupy</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nazwa grupy:
                            <input type="text" name="name" onChange={e => setName(e.target.value)} />
                        </label>
                        <label>
                            Kod grupy:
                            <input type="text" name="code" onChange={e => setCode(e.target.value)} />
                        </label>
                        <input type="submit" value="Stwórz" />
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

export default CreateGroup;