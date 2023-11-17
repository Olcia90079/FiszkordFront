import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="navbar">
      <div className="sidebar">
        Sidebar Content
      </div>
      <div className="topbar">
        <div className="navbar__container">
          <div className="navbar__logo">Fiszkord</div>
          <div className="navbar__pages">
            <button>Aktualności</button>
            <button>Fiszki</button>
            <button>Pliki</button>
            <button>Czat</button>
          </div>
          <div className="navbar__search">
            <input
              type="text"
              placeholder="Szukaj..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
