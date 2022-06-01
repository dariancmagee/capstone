import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../Login/logo.jpg";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <img src={logo} alt="Logo" height={65} width={65} />
      <h1>
        <Link to="/profile">View Profile</Link>
      </h1>
      <button className={styles.white_btn} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Header;
