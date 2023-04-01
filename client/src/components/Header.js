import React from "react";
import { Link } from "react-router-dom";
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
    <div>
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
        <div className="header m-0 p-2 col-11 justify-content-space-between">
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
                <FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon>{" "}
                Login
              </Link>
              <Link to="/signup">
                <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon> Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;

// <div className="">
// <div className="m-0">
//   <p id="promo" className="p-2 m-0 text-center">
//     100% GUARANTEE all First Time Customers Will Have a Great Summer!
//   </p>
// </div>

// <nav id="logo-nav" className="navbar navbar-expand-lg navbar-light">
//   <img
//     id="logo"
//     src="sic-logo.png"
//     width="80"
//     height="80"
//     className="d-inline-block align-top d-flex justify-content-start"
//     alt="SIC Logo"
//   />
//   <div className="header">
//     {Auth.loggedIn() ? (
//       <>
//         <Link to="/">Home</Link>
//         <Link to="/me">Profile</Link>
//         <button onClick={logout}>Logout</button>
//       </>
//     ) : (
//       <>
//         <Link to="/">Home</Link>
//         <Link to="/login">Login</Link>
//         <Link to="/signup">Signup</Link>
//       </>
//     )}
//   </div>
// </nav>
// </div>
// );
// }
