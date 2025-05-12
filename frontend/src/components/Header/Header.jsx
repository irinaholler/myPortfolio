import React, { useEffect, useRef, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import css from "./Header.module.scss";
import useHeaderShadow from "../../hooks/useHeaderShadow";

const Header = () => {
  const menuRef = useRef(null);
  const [menuOpened, setMenuOpened] = useState(false);
  const headerShadow = useHeaderShadow();
  const [headerColor, setHeaderColor] = useState("#278164");

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setHeaderColor("#278164");
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={css.wrapper}>
      <motion.div
        className={`bg-primary paddings ${css.wrapper}`}
        style={{ boxShadow: headerShadow, backgroundColor: headerColor }}
      >
        <div className={`innerWidth ${css.container} flexCenter`}>
          <Link to="/" className={css.logo}>
            ИDE
          </Link>

          <ul
            className={`flexCenter ${css.menu} ${menuOpened ? css.show : ""}`}
            ref={menuRef}
          >
            <li><a href="#me">ME</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li className={css.socialIcons}>
              <a href="https://github.com/irinaholler" target="_blank" rel="noopener noreferrer">
                <FaGithub size={30} />
              </a>
              <a href="https://www.linkedin.com/in/irinaniko/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={30} />
              </a>
              <a href="https://www.instagram.com/myirde/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={30} />
              </a>
            </li>
          </ul>

          <div
            className={css.menuIcon}
            onClick={() => setMenuOpened((prev) => !prev)}
          >
            <BiMenuAltRight size={30} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Header;
