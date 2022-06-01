import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../Login/logo.jpg";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <img src={logo} alt="Logo" height={65} width={65} />
     
    <Link to="/">
      <button type="button" className={styles.white_btn}>
			Exercises
		  </button>
    </Link>

    <Link to="/about">
          <button type="button" className={styles.white_btn}>
			About Us
		  </button>
    </Link>

      <button className={styles.white_btn} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};
export default Header;