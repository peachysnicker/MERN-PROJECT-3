import React from "react";
import { Link } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";
import "bootstrap/dist/css/bootstrap.css";

import Auth from "../utils/auth";

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className="">
      <div className="m-0">
        <p id="promo" className="p-2 m-0 text-center">
          100% GUARANTEE all First Time Customers Will Have a Great Summer!
        </p>
      </div>

      <nav id="logo-nav" className="navbar navbar-expand-lg navbar-light">
        <img
          id="logo"
          src="sic-logo.png"
          width="80"
          height="80"
          className="d-inline-block align-top d-flex justify-content-start"
          alt="SIC Logo"
        />
        <div className="header">
          {Auth.loggedIn() ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/me">Profile</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
