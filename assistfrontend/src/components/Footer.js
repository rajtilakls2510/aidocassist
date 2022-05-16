import React from "react";
import TislLogo from "../images/tisl_logo.jpg";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="dev-team">
        <h4>
          <b>Development Team (2018-2022)</b>
        </h4>
        <p>
          <i>Rajtilak Pal - 13000118069</i>
        </p>
        <p>
          <i>Raj Saha - 13000118073</i>
        </p>
        <p>
          <i>Raunak Bahadur Sinha - 13000118066</i>
        </p>
        <p>
          <i>Abhinav Chandra Jha - 13000218131</i>
        </p>
      </div>
      <div className="footer-img">
        <img src={TislLogo} alt="TISL Logo" className="footer-logo" />
      </div>
      <div className="project-details">
        <h4>
          <b>Project Information</b>
        </h4>
        <p>
          <i>Name : AI Doctor Assistant</i>
        </p>
        <p>
          <i>Mentor : Prof. Srimanta Kundu</i>
        </p>
        <p>
          <i>College : Techno Main Salt Lake</i>
        </p>
        <p>
          <i>University : MAKAUT</i>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
