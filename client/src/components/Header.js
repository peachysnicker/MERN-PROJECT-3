import React from "react";
import { Link } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faCartShopping,
  faRightToBracket,
  faUserPlus,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

import Auth from "../utils/auth";

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className="header">
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
          <Link to="/company">
            <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon> About us
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/">
            <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon> Home
          </Link>
          <Link to="/company">
            <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon> About us
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
