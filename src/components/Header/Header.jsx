import React, { useEffect, useRef, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import useHeaderShadow from "../../hooks/useHeaderShadow";
import css from "./Header.module.scss";
import { getMenuStyles } from "../../utils/motion";

const menuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.4 } },
};

const Header = () => {
  const menuRef = useRef(null);
  const [menuOpened, setMenuOpened] = useState(false);
  const headerShadow = useHeaderShadow();
  const [headerColor, setHeaderColor] = useState("#278164");


  // Handle clicking outside of sidebar on mobile
  useOutsideAlerter({ menuRef, setMenuOpened });

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
          <Link to="/" className={css.logo}>ИDE</Link>


          {/* Navigation Menu */}
          <ul className={`flexCenter ${css.menu}`} ref={menuRef} style={getMenuStyles(menuOpened)}>
            <li><a href="#me">ME</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#portfolio">Portfolio</a></li>

            {/* Social Icons */}
            <li className={`flexCenter ${css.socialIcons} ${menuOpened ? css.visible : css.hidden}`}>
              <a href="https://github.com/irinaholler" target="_blank" rel="irinaholler github">
                <FaGithub size={30} />
              </a>
              <a href="https://www.linkedin.com/in/irinaniko/" target="_blank" rel="irinaholler linkedin">
                <FaLinkedin size={30} />
              </a>
              <a href="https://www.instagram.com/myirde/" target="_blank" rel="irinaholler instagram">
                <FaInstagram size={30} />
              </a>
            </li>
          </ul>

          {/* Menu Icon for Small Screens */}
          <div className={css.menuIcon} onClick={() => setMenuOpened(prev => !prev)}>
            <BiMenuAltRight size={30} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Header;
