// Dołączanie do grupy

//     POST /api/group/join

// Wymaga access token jako bearer token. Wymagane body:

//     code: String

import React, { useState } from 'react';
import axios from 'axios';
import './join_group.css';

const JoinGroup = () => {
    const [groupCode, setGroupCode] = useState('');

    const handleJoinGroup = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/group/join', {
                code: groupCode,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h2>Join Group</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Group Code"
                    value={groupCode}
                    onChange={(e) => setGroupCode(e.target.value)}
                />
            </div>
            <button onClick={handleJoinGroup}>Join Group</button>
        </div>
    );
};

export default JoinGroup;