// navbar component with back button and link to a custom page

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = props => {
  const { title, back, iconLink } = props;
  const homeLink = 'href=' + back;
  return (
    <div className="navbar">
      <ul className="navbarWrapper">
        <li className="backLinkSVG">
          <NavLink to={homeLink}>
            <a homeLink>
              <p className="navbarText">{''}</p>
            </a>
          </NavLink>
        </li>
        <li className="navbarIcon">
          <NavLink to={iconLink} className="navbarTextLink">
            <p className="navbarText">{title} </p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
