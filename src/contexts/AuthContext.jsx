import { createContext, useContext, useState } from "react";
import { auth, db, provider } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const handleCreateUserWithEmailAndPassword = async (
    userName,
    email,
    password
  ) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (newUser) {
        const userInfo = {
          name: userName,
          email: email,
          uid: newUser.user.uid,
        };
        await setDoc(doc(db, "users", userInfo.uid), userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // get user from database and check if user exists login
      const userInfo = await getDoc(doc(db, "users", user.user.uid));
      if (userInfo.exists()) {
        localStorage.setItem("user", JSON.stringify(userInfo.data()));
        setUser(userInfo);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAuthWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      // get user from database and check if user exists login if not create user
      const userInfo = await getDoc(doc(db, "users", user.user.uid));
      if (userInfo.exists()) {
        localStorage.setItem("user", JSON.stringify(userInfo.data()));
      } else {
        const userInfo = {
          name: user.user.displayName,
          email: user.user.email,
          uid: user.user.uid,
        };
        await setDoc(doc(db, "users", userInfo.uid), userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleCreateUserWithEmailAndPassword,
        handleLogin,
        handleLogOut,
        handleAuthWithGoogle,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
