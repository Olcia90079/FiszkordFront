import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaSync } from 'react-icons/fa';
import { setUserGroups as refreshGroups } from '../Store/actions';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = () => {
  // Lista grup użytkownika

  // GET / api / group / user - groups

  // Wymaga access token jako bearer token.

  // Zwraca listę grup, do których należy użytkownik.

  const flag = useSelector((state) => state.flag);

  const [userGroups, setUserGroups] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/group/user-groups', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserGroups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);

  const handleRefresh = () => {
    dispatch(refreshGroups());
  };

  return (
    <div className="sidebar">
      <>
        <div className="group-list">
          <h2>Twoje grupy</h2>
          <button onClick={handleRefresh} className="refresh-button">
              <FaSync />
            </button>
          <ul>
            {userGroups.map((group, index) => (
              <li key={index}>{group.name}</li>
            ))}
          </ul>
        </div>
        <Link to="/create-group" className="sidebar-button">
          Utwórz grupę
        </Link>
        <Link to="/join-group" className="sidebar-button">
          Dołącz do grupy
        </Link>
      </>
    </div>
  );
};

export default Sidebar;
