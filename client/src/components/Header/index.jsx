import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <h1>
        <Link to="/profile">DJ Fitness</Link>
      </h1>
      <button className={styles.white_btn} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Header;
