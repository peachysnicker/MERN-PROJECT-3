import React from 'react';
import { Link } from 'react-router-dom';

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
            Home
          </Link>
          <Link to="/me">
            Profile
          </Link>
          <Link to="/cart">
            Cart
          </Link>
          <button onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/">
            Home
          </Link>
          <Link to="/login">
            Login
          </Link>
          <Link to="/signup">
            Signup
          </Link>
        </>
      )}
    </div>
  );
}

export default Header;