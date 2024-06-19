import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { deleteSongById } from "../../api";
import {useStateValue} from "../context/StateProvider"
import { actionType } from "../context/reducer";
export const SongCard = ({ data, index }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const [{ allSongs, song, isSongPlaying,songIndex }, dispatch] = useStateValue();

  
  const deleteSong = () => {
    setIsDelete(true);
  };

  const confirmDelete = async () => {
    await deleteSongById(data._id);
    window.location.reload(); // Reload the page after deletion
  };

  const addToContext = () => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };

  return (
    <motion.div className="relative w-40 min-w-210 px-2 cursor-pointer bg-gray-500 py-4 rounded-lg shadow-md flex flex-col items-center
    " onClick={addToContext}>
      <motion.img
        whileHover={{ scale: 1.4 }}
        src={data.imageURL}
        className="w-40 h-40 object-cover rounded-lg"
        alt=""
      />

      <p className="text-lg text-center">
        {data.name.length > 20
          ? data.name.slice(0, 20) + "..."
          : data.name}
      </p>
      <p className="text-sm text-textColor text-center">
        {data.artist.length > 20
          ? data.artist.slice(0, 20) + "..."
          : data.artist}
      </p>
      <div>
        <motion.i
          className="absolute bottom-2 right-2"
          whileTap={{ scale: 0.75 }}
          onClick={deleteSong}
        >
          <MdDelete className="text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
        </motion.i>

        {isDelete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="rounded-md absolute inset-0 p-2 bg-darkOverlay backdrop-blur-md flex flex-col items-center justify-center gap-4"
          >
            <p className="text-gray-100 text-base text-center">
              Are you sure you want to delete this?
            </p>
            <div className="flex items-center w-full justify-center gap-3">
              <div className="bg-red-300 px-3 rounded-md">
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="text-headingColor px-2 py-1 text-sm uppercase"
                  onClick={confirmDelete}
                >
                  Yes
                </motion.button>
              </div>
              <div className="bg-green-300 px-3 rounded-md">
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="text-headingColor px-2 py-1 text-sm uppercase"
                  onClick={() => setIsDelete(false)}
                >
                  No
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SongCard;
