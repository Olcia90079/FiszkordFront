import React, { useState } from 'react';
import axios from 'axios';
import './create_group.css';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');

  //   const handleCreateGroup = async () => {
  //     try {
  //       const response = await axios.post(
  //         '/api/group/create',
  //         {
  //           name: groupName,
  //           code: groupCode,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${yourAccessToken}`,
  //           },
  //         }
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <div>
      <h2>Create Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Group Code"
        value={groupCode}
        onChange={(e) => setGroupCode(e.target.value)}
      />
      <button>Create Group</button>
    </div>
  );
};

export default CreateGroup;
