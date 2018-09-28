// navbar component with back button and link to a custom page

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = props => {
  const { title, searchPage } = props;

  return (
    <div className="navbar">
      <ul className="navbarWrapper">
        <li className="backLinkSVG">
          {searchPage ? (
            <a href="/bahmni/home/index.html#/dashboard">
              <p className="backLink">{''}</p>
            </a>
          ) : (
            <NavLink to="/search">
              <p className="backLink">{''}</p>
            </NavLink>
          )}
        </li>
        <p className="navbarTextPage">{title}</p>
        <li className="navbarIcon">
          {searchPage ? (
            <NavLink to="/new" className="navbarTextLink">
              <p className="navbarNewPerson">{'Register New Person'}</p>
            </NavLink>
          ) : (
            <NavLink to="/search" className="navbarTextLink">
              <p className="navbarText">{'Search'}</p>
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
