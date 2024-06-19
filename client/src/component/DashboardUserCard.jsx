import React, { useState } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import { changingUserRole, getAllUsers, removeUser } from "../../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { MdDelete } from "react-icons/md";

const DashboardUserCard = ({ data, index }) => {
  const [{ user }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false);

  const updateUserRole = (userId, role) => {
    changingUserRole(userId, role)
      .then((res) => {
        if (res) {
          return getAllUsers();
        }
      })
      .then((data) => {
        if (data) {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating user role or fetching all users:", error);
      });
  };

  const deleteUser = (userId) => {
    removeUser(userId)
      .then((res) => {
        if (res) {
          return getAllUsers();
        }
      })
      .then((data) => {
        if (data) {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting user or fetching all users:", error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="w-full grid grid-cols-6 gap-4 items-center py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md rounded-md relative"
    >
      {data._id !== user?.user._id && (
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200"
          onClick={() => deleteUser(data._id)}
        >
          <MdDelete className="text-xl text-red-400 hover:text-red-500" />
        </motion.div>
      )}
      <div className="flex items-center justify-center">
        <img
          src={data.imageurl}
          alt=""
          className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
        />
      </div>
      <p className="text-base text-textColor text-center">{data.name}</p>
      <p className="text-base text-textColor text-center">{data.email}</p>
      <p className="text-base text-textColor text-center">{data.email_verified ? "True" : "False"}</p>
      <p className="text-base text-textColor text-center">
        {moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <div className="text-center flex items-center justify-center gap-6 relative">
        <p className="text-base text-textColor">{data.role}</p>
        {data._id !== user?.user._id && (
          <motion.p
            whileTap={{ scale: 0.75 }}
            className="text-[10px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md"
            onClick={() => setIsUserRoleUpdated(true)}
          >
            {data.role === "admin" ? "Member" : "Admin"}
          </motion.p>
        )}
        {isUserRoleUpdated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute z-10 top-6 right-4 rounded-md p-4 flex items-start flex-col gap-4 bg-white shadow-xl"
          >
            <p className="text-textColor text-sm font-semibold">
              Are you sure you want to mark the user as{" "}
              <span>{data.role === "admin" ? "Member" : "Admin"}</span>?
            </p>
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md"
                onClick={() => {
                  updateUserRole(data._id, data.role === "admin" ? "member" : "admin");
                  setIsUserRoleUpdated(false);
                }}
              >
                Yes
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-gray-200 text-black hover:shadow-md"
                onClick={() => setIsUserRoleUpdated(false)}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardUserCard;
