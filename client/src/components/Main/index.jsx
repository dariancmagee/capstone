import styles from "./styles.module.css";
import React, { useState } from "react";
import logo from "./logo.jpg";
import ExerciseCard from "../../ExerciseCard";
import { getAddedFavorites } from "../../utils/functions";
import { Link, useNavigate } from "react-router-dom";
import bicepscurl from "../video/bicepscurl.mp4"


function Home() {
  
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const [bodyPart, setBodyPart] = useState("");
  const [exercises, setExercises] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const changeBodyPart = (newBodyPart) => {
    setBodyPart(newBodyPart);
  };
  const axios = require("axios");
  async function getExerciseData() {
    try {
      const options = {
        method: "GET",
        url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
        headers: {
          "X-RapidAPI-Host": `exercisedb.p.rapidapi.com/`,
          "X-RapidAPI-Key": `${process.env.REACT_APP_FITNESS_API_KEY}`,
        },
      };
      const { data } = await axios.request(options);
      setExercises(data);
    } catch (error) {
      console.log(error);
      setExercises([]);
    }
  }

  const handleOnClick = function () {
    getAddedFavorites().then(function (result) {
      setFavoritesList(result);
      getExerciseData();
    });
  };

  const addToFavorites = async function ({
    id,
    photo,
    bodyPart,
    equipment,
    gifUrl,
    name,
  }) {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const { data } = await axios.post(
        "/api/users/addtoFavorites",
        {
          id,
          photo,
          bodyPart,
          equipment,
          gifUrl,
          name,
          token,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <video autoPlay loop muted
    style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: "-1"
    }}
 >
     <source src={bicepscurl} type="video/mp4"/>
 </video>
    <div className="App">
      
       <nav className={styles.navbar}>
      <img src={logo} alt="logo" height={65} width={65} />
      <Link to="/profile">
						<button type="button" className={styles.white_btn}>
							Profile
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
      <br />
      <br />
      <h2 className={styles.h2}>Choose Muscle Group</h2>
      <form className="controls">
        <select
          onChange={(event) => changeBodyPart(event.target.value)}
          value={bodyPart}
        >
          <option value=""></option>
          <option value="back">Back</option>
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
      <button onClick={handleOnClick}>Get List of Exercises</button>
      <div className="exercise-list">
        {exercises &&
          exercises.slice(0, 20).map(function (exercise) {
            const addedFavorite =
              favoritesList?.find((item) => item.id === exercise.id) || false;
            return (
              <ExerciseCard
                key={exercise.id}
                {...exercise}
                addToFavorites={addToFavorites}
                isAddedFavorite={addedFavorite}
              />
            );
          })}
      </div>
    </div>
    </div>
  );
  
}

export default Home;
