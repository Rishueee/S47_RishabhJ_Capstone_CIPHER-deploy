import React from "react";
import {
  BsEmojiSmile,
  BsEmojiSmileUpsideDown,
  BsEmojiTear,
  BsEmojiTearFill,
} from "react-icons/bs";
import { motion } from "framer-motion";

const Alert = ({ type }) => {
  return (
    <motion.div
      initial={{ translateX: 200, opacity: 0, y: 50, scale: 0.5 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: 200, opacity: 0, y: 50, scale: 0.5 }}
      key={type}
      className={`fixed top-12 right-12 px-4 py-2 rounded-md backdrop-blur-md flex items-center justify-center shadow-md ${
        type === "success" && "bg-green-500"
      } ${type === "error" && "bg-red-500"}`}
    >
      {type === "success" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiSmile className="text-3xl text-white" />
          <p className="text-xl text-white font-semibold">DATA SAVED</p>
        </div>
      )}

      {type === "error" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiTearFill className="text-3xl text-white" />
          <p className="text-xl text-white font-semibold">
            Something went wrong
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Alert;
