import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  getAllUsers,
} from "../../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { bgColors } from "../utils/styles";

export const DashboardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div
      style={{ background: `${bg_color}` }}
      className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-sm text-textColor">{count}</p>
    </div>
  );
};

const DashBoardHome = () => {
  const [{ allUsers, allSongs, allArtist, allAlbums }, dispatch] =
    useStateValue();
  console.log(
    "allUsers",
    allUsers,
    "allSongs",
    allSongs,
    "allArtist",
    allArtist,
    "allAlbums",
    allAlbums
  );

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
        console.log("useressss", data);
      });
    }

    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }

    if (!allArtist) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.data });
      });
    }
  }, []);

  return (
    <div className="w-full h-full p-6 flex flex-wrap gap-4 justify-center">
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
        <DashboardCard
          icon={<FaUsers className="text-3xl text-textColor" />}
          name={"Users"}
          count={allUsers?.length > 0 ? allUsers?.length : 0}
        />

        <DashboardCard
          icon={<GiLoveSong className="text-3xl text-textColor" />}
          name={"Songs"}
          count={allSongs?.length > 0 ? allSongs?.length : 0}
        />
      </div>

      <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
        <DashboardCard
          icon={<RiUserStarFill className="text-3xl text-textColor" />}
          name={"Artist"}
          count={allArtist?.length > 0 ? allArtist?.length : 0}
        />

        <DashboardCard
          icon={<GiMusicalNotes className="text-3xl text-textColor" />}
          name={"Album"}
          count={allAlbums?.length > 0 ? allAlbums?.length : 0}
        />
      </div>
    </div>
  );
};

export default DashBoardHome;
