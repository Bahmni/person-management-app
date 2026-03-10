// navbar component with back button and link to a custom page

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = props => {
  const { title, searchPage } = props;
  return (
    <div className="navbar">
      <ul className="navbarWrapper">
        {!searchPage && (
          <li className="backLinkSVG">
            <NavLink to="/">
              <p className="backLink">{''}</p>
            </NavLink>
          </li>
        )}
        <p className="navbarTextPage">{title}</p>
        <li className="navbarIcon">
          {searchPage ? (
            <NavLink to="/new" className="navbarTextLink">
              <p className="navbarNewPerson">{'Register New Person'}</p>
            </NavLink>
          ) : (
            <NavLink to="/" className="navbarTextLink">
              <p className="navbarText">{'Search Person'}</p>
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
