// Sidebar będzie zawierał listę grup, do których należy użytkownik
// będzie się wyświetlał po lewej stronie ekranu
// będzie widoczny tylko dla zalogowanych użytkowników
// będzie zawierał przycisk do tworzenia nowej grupy
// będzie zawierał przycisk do dołączania do grupy
// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom'; // Jeśli korzystasz z routingu
import './Sidebar.css'; // Zaimportuj plik ze stylami CSS
// import axios from 'axios';

const Sidebar = () => {
  // Lista grup użytkownika

  // GET / api / group / user - groups

  // Wymaga access token jako bearer token.

  // Zwraca listę grup, do których należy użytkownik.

  // const userGroups = axios.get('http://localhost:8080/api/group/user-groups', {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });

  const userGroups = ['Grupa 1', 'Grupa 2', 'Grupa 3']; // Przykładowa lista grup

  return (
    <div className="sidebar">
      <>
        <div className="group-list">
          <h2>Twoje grupy</h2>
          <ul>
            {userGroups.map((group, index) => (
              <li key={index}>{group}</li>
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
