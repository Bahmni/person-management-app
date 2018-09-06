import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavBar = props => {
  const { title } = props;
  return (
    <div className="navbar">
      <Link to="/search" className="navbarWrapper">
        <span className="backLinkSVG" />
        <h3 className="navbarHeader">{title}</h3>
      </Link>
    </div>
  );
};

export default NavBar;
