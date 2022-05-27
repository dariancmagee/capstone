import styles from "./styles.module.css";
import React, {useState} from 'react';
import BasicPagination from "./Pagination";


const exerciseKey = 'b8df9963admsh684c57c571ebbcap1ca6bdjsnff7a2f6a4584';

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};



function Home() {
  const [bodyPart, setBodyPart] = useState("");
  const changeBodyPart = (newBodyPart) => {
    setBodyPart(newBodyPart)
  }
  const axios = require('axios');
  
  function getExerciseData() {
  const options = {
    method: 'GET',
    url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
    headers: {
      'X-RapidAPI-Host': `exercisedb.p.rapidapi.com/`,
      'X-RapidAPI-Key': `${exerciseKey}`
    }
  };
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  }
  return (
    <div className="App">
      <nav className={styles.navbar}>
        <h1>DJ Fitness</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
      <br />
      <br />
          <form className="controls">
            <select
              onChange={(event) => changeBodyPart(event.target.value)}
              value={bodyPart}
            >
              <option value=""></option>
              <option value="back">Waist</option>
              <option value="cardio">Cardio</option>
              <option value="chest">Chest</option>
              <option value="lower arms">Lower Arms</option>
              <option value="lower legs">Lower Legs</option>
              <option value="neck">Neck</option>
              <option value="shoulders">Shoulders</option>
              <option value="upper arms">Upper Arms</option>
              <option value="upper legs">Upper legs</option>
              <option value="waist">Waist</option>
            </select>
         </form>
		 <button onClick={getExerciseData}>Get List of Exercises</button>
    </div>
  
  );	
	
};

export default Home;


	
	










