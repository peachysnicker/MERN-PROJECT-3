import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="footer">
      <a
        href="https://github.com/peachysnicker/MERN-PROJECT-3"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
      </a>
    </div>
  );
}

export default Footer;
