// Tworzenie grupy

//     POST /api/group/create

// Wymaga access token jako bearer token. Wymagane body:

//     name: String
//     code: String

import React, { useState } from 'react';
import axios from 'axios';
import './create_group.css';

const CreateGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [groupCode, setGroupCode] = useState('');

    const handleCreateGroup = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/group/create', {
                name: groupName,
                code: groupCode,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h2>Create Group</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </div>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Group Code"
                    value={groupCode}
                    onChange={(e) => setGroupCode(e.target.value)}
                />
            </div>
            <button onClick={handleCreateGroup}>Create Group</button>
        </div>
    );
};

export default CreateGroup;