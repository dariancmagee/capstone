import styles from "./styles.module.css";
import React, { useState } from "react";
import MediaCard from "../../Cards";
import ExerciseCard from "../../ExerciseCard";
import Header from "../Header";
import { getAddedFavorites } from "../../utils/functions";
import background from "./bghomepage.jpg";

const exerciseKey = "b8df9963admsh684c57c571ebbcap1ca6bdjsnff7a2f6a4584";

function Home() {
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
          "X-RapidAPI-Key": `${exerciseKey}`,
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

  /*const getAddedFavorites =  async function() {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const {data} = await axios.post(`http://localhost:8080/api/users/favorites`, {token});
      console.log({data});
      setFavoritesList(data[0].favorites);
    } catch (error) {
      console.log(error);
    }
  }*/

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
        "http://localhost:8080/api/users/addtoFavorites",
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
    <div className="App">
      <Header />
      <br />
      <br />
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
  );
}

export default Home;
