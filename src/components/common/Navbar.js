// navbar component with back button and link to a custom page

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useTranslation } from 'react-i18next';

const NavBar = props => {
  const { title, searchPage } = props;
  const { t } = useTranslation();
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
              <p className="navbarNewPerson">
                {t('Register New Person', 'Register New Person')}
              </p>
            </NavLink>
          ) : (
            <NavLink to="/search" className="navbarTextLink">
              <p className="navbarText">
                {t('Search Person', 'Search Person')}
              </p>
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
