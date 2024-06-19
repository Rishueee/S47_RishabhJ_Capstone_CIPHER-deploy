import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { useStateValue } from "../context/StateProvider";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";
const Header = () => {
  const [ismenu, setismenu] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  // console.log(user);

  const logout = () => {
    // Reset music player state
    dispatch({
      type: actionType.SET_ISSONG_PLAYING,
      isSongPlaying: false,
    });
    dispatch({
      type: actionType.SET_SONG_INDEX,
      songIndex: 0,
    });
  
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
        // Redirect or handle logout success
      })
      .catch((err) => {
        console.log(err);
        Navigate("/login");
        // Handle logout failure
      });
  };
  
  return (
    <header className="w-full p-4 md:py-2 md:px-6  flex  items-center">
      <NavLink to={"/"}>
        {/* <img src={Logo} className="w-16" alt="" /> */}
      </NavLink>
      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/musics"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Musics
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/premium"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Premium
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div
        onMouseEnter={() => setismenu(true)}
        onMouseLeave={() => setismenu(false)}
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
      >
        <img
          src={user?.user?.imageurl}
          alt=""
          className=" h-12 w-12 min-w-[44px] object-cover rounded-full shadow-lg"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
            {user?.user?.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Premium Member <FaCrown className="text-sm -ml-1 text-yellow-500" />{" "}
          </p>
          {ismenu && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className=" p-3 w-[150px] absolute z-10 top-12 right-0  gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
            >
              <NavLink to={"/userprofile"}>
                <p className="text-base text-textColor hover:font-semibold duration-150 trasition-all ease-in-out">
                  Profile
                </p>
              </NavLink>
              <p className="text-base text-textColor hover:font-semibold duration-150 trasition-all ease-in-out">
                My Favourites
              </p>
              <hr />

              {user?.user?.role === "admin" && (
                <>
                  <NavLink to="/dashboard/home">
                    <p className="text-base text-textColor hover:font-semibold duration-150 trasition-all ease-in-out">
                      Dashboard
                    </p>
                  </NavLink>
                  <hr />
                </>
              )}

              <p
                className="text-base text-textColor hover:font-semibold duration-150 trasition-all ease-in-out"
                onClick={logout}
              >
                Sign Out
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
