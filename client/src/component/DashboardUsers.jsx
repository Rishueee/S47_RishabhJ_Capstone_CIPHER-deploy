import React, { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { motion } from "framer-motion";
import { getAllUsers } from "../../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import DashboardUserCard from "./DashboardUserCard";

const DashboardUsers = () => {
  const [emailFilter, setEmailFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [{ allUsers }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.users,
        });
        console.log("user dataDU", data.users);
      });
    }
  }, [allUsers, dispatch]);

  useEffect(() => {
    if (emailFilter) {
      const filtered = allUsers.filter(
        (data) =>
          data.email.includes(emailFilter) ||
          data.name.includes(emailFilter) ||
          data.role.includes(emailFilter)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(null); // Reset filtered users when filter is cleared
    }
  }, [emailFilter, allUsers]);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-24">
        <input
          type="text"
          placeholder="Search here"
          className={`w-52 px-4 py-2 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />

        {emailFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setEmailFilter("");
            }}
          >
            <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
          </motion.i>
        )}
      </div>

      <div className="relative w-full py-12 min-h-[400px] overflow-x-auto scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        {filteredUsers && (
          <div className="absolute top-4 left-4">
            <p className="text-xl font-bold">
              <span className="text-sm font-semibold text-textColor">
                Count :{" "}
              </span>
              {filteredUsers.length}
            </p>
          </div>
        )}

        <div className="w-full min-w-[750px] grid grid-cols-6 gap-4">
          <p className="text-sm text-textColor font-semibold text-center">Image</p>
          <p className="text-sm text-textColor font-semibold text-center">Name</p>
          <p className="text-sm text-textColor font-semibold text-center">Email</p>
          <p className="text-sm text-textColor font-semibold text-center">Verified</p>
          <p className="text-sm text-textColor font-semibold text-center">Created</p>
          <p className="text-sm text-textColor font-semibold text-center">Role</p>
        </div>

        <div className="w-full min-w-[750px] flex flex-col gap-3">
          {filteredUsers && Array.isArray(filteredUsers) && filteredUsers.map((data, i) => (
            <DashboardUserCard data={data} key={data._id} index={i} />
          ))}

          {!filteredUsers && allUsers && Array.isArray(allUsers) && allUsers.map((data, i) => (
            <DashboardUserCard data={data} key={data._id} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;
