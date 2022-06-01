import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getAddedFavorites } from "../../utils/Functions";
import ExerciseCard from "../../ExerciseCard";
import Header2 from "../Header2";

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
        <Header2 />
      {user && (
        <div className={styles.profileInfo}>
          <div> Username: {user.userName}</div>
          <div> Email: {user.email}</div> 
        </div>
      )}
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