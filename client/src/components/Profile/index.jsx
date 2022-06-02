import React, { useEffect, useState } from "react";
import Header2 from "../Header2";
import styles from "./styles.module.css";
import { getAddedFavorites } from "../../utils/functions";
import ExerciseCard from "../../ExerciseCard";
import pushups from "../video/pushups.mp4"

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
         <video autoPlay loop muted
    style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: "-1"
    }}
 >
     <source src={pushups} type="video/mp4"/>
 </video>
    <div className="App">
      <Header2 />
      {user && (
        <div className={styles.profileInfo}>
          <div> Username: {user.userName}</div>
          <div> Email: {user.email}</div> <br />
        </div>
      )}
      
      <div className="exercise-list">
        {exercises &&
          exercises.map((exercise) => {
            return <ExerciseCard key={exercise.id} {...exercise} />;
          })}
      </div>
    </div>
    </div>
  );
};

export default Profile;
