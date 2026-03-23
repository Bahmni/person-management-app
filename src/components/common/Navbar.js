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
              <p className="navbarNewPerson">
                {t('Register New Person', 'Register New Person')}
              </p>
            </NavLink>
          ) : (
            <NavLink to="/" className="navbarTextLink">
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
