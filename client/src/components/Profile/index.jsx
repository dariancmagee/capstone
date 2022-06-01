import axios from "axios";
import React, { useEffect, useState } from "react";
import Header2 from "../Header2";
import styles from "./styles.module.css";
import Main from "../Main/index";
import { Link } from "react-router-dom";
import { getAddedFavorites } from "../../utils/functions";
import ExerciseCard from "../../ExerciseCard";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [exercises, setExercises] = useState(null);
  useEffect(() => {
    try {
      const userName = JSON.parse(localStorage.getItem("user"));
      const email = JSON.parse(localStorage.getItem("email"));
      if (userName && email) {
        setUser({ userName, email });
      }

      getAddedFavorites().then((response) => {
        setExercises(response);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Header2 />
      {user && (
        <div className={styles.profileInfo}>
          <div> Username: {user.userName}</div>
          <div> Email: {user.email}</div> <br />
        </div>
      )}
      <Link to="/exercises">See all exercises</Link>

      <hr />
      <div className="exercise-list">
        {exercises &&
          exercises.map((exercise) => {
            return <ExerciseCard key={exercise.id} {...exercise} />;
          })}
      </div>
    </div>
  );
};

export default Profile;
