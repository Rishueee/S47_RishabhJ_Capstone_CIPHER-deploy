import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { validateuser, getAllSongs } from "../api";
import { Dashboard, Home, Login, UserProfile, MusicPlayer, Signup } from "./component";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const location = useLocation();
  const [{ user, allSongs, isSongPlaying }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(window.localStorage.getItem("auth") === "true");

  useEffect(() => {
    window.localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token)
          window.localStorage.setItem("auth", "true");
          validateuser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
        setIsLoading(false);
      } else {
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        setIsLoading(false);
        window.localStorage.setItem("auth", "false");
        // Only navigate to login if not already on signup page
        if (location.pathname !== "/signup") {
          navigate("/login");
        }
      }
    });
  }, [firebaseAuth, navigate, dispatch, location.pathname]);

  useEffect(() => {
    if (!allSongs && user) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, [allSongs, user, dispatch]);

  useEffect(() => {
    const lastRoute = window.localStorage.getItem("lastRoute");
    if (lastRoute) {
      navigate(lastRoute);
    }
  }, [navigate]);

  return (
    <AnimatePresence>
      <div className="h-auto flex items-center justify-center min-w-[680px]">
        {isLoading || (!user && (
          <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm">
            {/* <Loader /> */}
          </div>
        ))}
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/signup" element={<Signup setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center"
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default App;
