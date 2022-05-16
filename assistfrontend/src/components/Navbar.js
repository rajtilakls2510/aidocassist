import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../images/logo-title.jpg";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const linksRef = useRef(null);

  const handleToggle = (e) => {
    setNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (navOpen) {
      const links = linksRef.current.querySelectorAll(".nav-link");
      let height = `${
        links[0].getBoundingClientRect().height * links.length
      }px`;
      linksRef.current.style.height = height;
    } else {
      linksRef.current.style.height = 0;
    }
  }, [navOpen]);

  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <img src={Logo} alt="Logo" className="nav-logo" />
          <button className="nav-toggle" onClick={handleToggle}>
            <FaBars />
          </button>
        </div>

        <div className="nav-links-container " ref={linksRef}>
          <ul className="nav-links ">
            <li>
              <Link
                to="/"
                className="nav-link"
                onClick={() => setNavOpen(false)}
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
