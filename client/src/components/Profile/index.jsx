import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header";
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
      console.log({ name: userName });
      if (userName && email) {
        setUser({ userName, email });
      }

      getAddedFavorites().then((response) => {
        console.log({ response });
        setExercises(response);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log({ user });
  return (
    <div>
      <Header />
      {user && (
        <div className={styles.profileInfo}>
          <div> Username: {user.userName}</div>
          <div> Email: {user.email}</div>
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
