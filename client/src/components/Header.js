import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faCartShopping, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import Auth from '../utils/auth';

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  return (
    <div className='header'>
      {Auth.loggedIn() ? (
        <>
          <Link to="/">
            <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon> Home
          </Link>
          <Link to="/me">
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Profile
          </Link>
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon> Cart
          </Link>
          <button onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/">
            <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon> Home
          </Link>
          <Link to="/login">
            <FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon> Login
          </Link>
          <Link to="/signup">
            <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon> Signup
          </Link>
        </>
      )}
    </div>
  );
}

export default Header;