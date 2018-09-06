import React from 'react';
import './Navbar.css';

const title = 'Person Management';
const NavBar = () => {
  return (
    <div className="navbar">
      <h3 className="navbarHeader">{title}</h3>
    </div>
  );
};

export default NavBar;
