import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Tasks from "./pages/Tasks/Tasks";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/Signin/SignIn";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/");
        const userInfo = await getDoc(doc(db, "users", user.user.uid));
        localStorage.setItem("user", JSON.stringify(userInfo.data()));
        setUser(userInfo.data());
      } else {
        navigate("/signin");
      }
    });
  }, [user]);

  return (
    <>
      {!(
        location.pathname === "/signin" || location.pathname === "/signup"
      ) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mytasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;

// authentication => completed
// create tasks => completed
// delete tasks => completed
