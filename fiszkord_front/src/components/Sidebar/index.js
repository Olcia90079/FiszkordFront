import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Jeśli korzystasz z routingu
import './Sidebar.css'; // Zaimportuj plik ze stylami CSS
import axios from 'axios';

const Sidebar = () => {
  // Lista grup użytkownika

  // GET / api / group / user - groups

  // Wymaga access token jako bearer token.

  // Zwraca listę grup, do których należy użytkownik.

  // TODO:
  // Komponent za szybko próbuje pobrać listę grup użytkownika, 
  // zanim access token zostanie zapisany w localStorage.
  // W takim przypadku, komponent nie wyświetli listy grup użytkownika,
  // a w konsoli jest błąd 403 (Forbidden).
  // Trzeba to jakoś poprawić :/

  const [userGroups, setUserGroups] = useState([]);

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
  }, []);

  return (
    <div className="sidebar">
      <>
        <div className="group-list">
          <h2>Twoje grupy</h2>
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
