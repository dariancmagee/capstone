import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from "./styles.module.css";


const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

const About = () => {


return (
    <div className="about">
          <nav className={styles.navbar}>
            <h1>DJ Fitness</h1>
            <Link to="/">
						<button type="button" className={styles.white_btn}>
							Profile
						</button>
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

   <div className='github'>
    <a href={`https://github.com/dariancmagee`}>Darian Github</a>
   </div>
   <br />
   <div className='github'>
    <a href={`https://github.com/JeffEQ`}>Jeff Github</a>
   </div>

    </div>
)





}

export default About;