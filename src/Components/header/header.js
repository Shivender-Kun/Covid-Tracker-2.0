import React from "react";
import "./header.css";
import Safe from "../images/stay-safe.png";
import Github from "../images/github.png";
import Linkedin from "../images/linkedin.png";

export default function Header() {
  return (
    <React.Fragment>
      <header>
        <img id="safe-img" src={Safe} alt="Stay Home Stay Safe" />
        <div id="heading">
          <h1 id="project-title">COVID-19 India V2.0</h1>
        </div>
        <div id="accounts-icon">
          <a href="https://github.com/Shivender-kun" target="blank">
            <img src={Github} alt="My Github account" />
          </a>
          <a href="https://www.linkedin.com/in/shivender-kun" target="blank">
            <img src={Linkedin} alt="My Linkedin account" />
          </a>
        </div>
      </header>
    </React.Fragment>
  );
}
