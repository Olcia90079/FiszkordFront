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
            <div className="navbar__page">Page 1</div>
            <div className="navbar__page">Page 2</div>
            <div className="navbar__page">Page 3</div>
            <div className="navbar__page">Page 4</div>
          </div>
          <div className="navbar__search">
            <input
              type="text"
              placeholder="Search"
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
