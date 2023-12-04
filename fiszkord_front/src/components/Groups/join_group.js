import React, { useState } from 'react';
import axios from 'axios';
import './join_group.css';

const JoinGroup = () => {
    const [groupCode, setGroupCode] = useState('');
    
    // const handleJoinGroup = async () => {
    //     try {
    //     const response = await axios.post(
    //         '/api/group/join',
    //         {
    //         code: groupCode,
    //         },
    //         {
    //         headers: {
    //             Authorization: `Bearer ${yourAccessToken}`,
    //         },
    //         }
    //     );
    //     console.log(response);
    //     } catch (error) {
    //     console.log(error);
    //     }
    // };
    
    return (
        <div>
        <h2>Join Group</h2>
        <input
            type="text"
            placeholder="Group Code"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
        />
        <button>Join Group</button>
        </div>
    );
}

export default JoinGroup;