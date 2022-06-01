import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import About from "./components/About /about";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState("");
  
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("token") || null);
      console.log({ user });
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/exercises" exact element={<Main />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/about" exact element={<About />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );

}

export default App;
