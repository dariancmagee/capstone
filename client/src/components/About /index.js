import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import styles from "./styles.module.css";
import logo from "./logo.jpg";
import portfolio from "./portfolio.JPG";
import portfolio2 from "./portfolio2.JPG";
import handshake from "../video/handshake.mp4"


const About = () => {
    
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    };

return (
    <div className="about">
           
 <video autoPlay loop muted
    style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: "-1"
    }}
 >
     <source src={handshake} type="video/mp4"/>
 </video>
          <nav className={styles.navbar}>
          <img src={logo} alt="Logo" height={65} width={65} />
            <Link to="/profile">
						<button type="button" className={styles.white_btn}>
							Profile
						</button>
					</Link>
          <Link to="/exercises">
            <button type="button" className={styles.white_btn}>
							Exercises
						</button>
          </Link>

				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
    <br />
    <br />
    <br />

   <div className={styles.github}>
    <img src={portfolio} alt="Portfolio" height={300} />
    <a href={`https://github.com/dariancmagee`} className={styles.link} >Darian Github</a>
    
    <img src={portfolio2} alt="Portfolio2" height={300} />
    <a href={`https://github.com/JeffEQ`} className={styles.link}>Jeff Github</a>
   
   </div>

    </div>
    
)

}

export default About;