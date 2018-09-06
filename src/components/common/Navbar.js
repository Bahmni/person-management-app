import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = props => {
  const { title } = props;
  return (
    <div className="navbar">
      <ul className="navbarWrapper">
        <span className="backLinkSVG" />
        <li>
          <NavLink to="/search">
            <h3 className="navbarHeader" />
            {title}
          </NavLink>
        </li>
        <li>
          <NavLink to="/person/new" className="addPersonLink">
            <p>Register new person</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
