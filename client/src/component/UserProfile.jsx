import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import Header from './Header';

const UserProfile = () => {
  const [{ user }] = useStateValue();
  const navigate = useNavigate();
  const username = user?.user?.name;
  const imageurl = user?.user?.imageurl;
  const email = user?.user?.email;
  const createdAt = user?.user?.createdAt;
  const role = user?.user?.role;
  const subscription = user?.user?.subscription;
  const phnumber = user?.user?.ph_number;
  const email_verified = user?.user?.email_verified;
  const _id = user?.user?._id;
  const user_id = user?.user?.user_id;
  

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-center items-center flex-grow">
        {user ? (
          <div className="max-w-md bg-white shadow-md rounded-md overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">{username}</h1>
              <div className="flex items-center mb-4">
                <img src={imageurl} alt="" className="w-10 h-10 rounded-full mr-2" />
                <p className="text-gray-700">{email}</p>
              </div>
              <div className="mb-4">
                <p><span className="font-semibold">Role:</span> {role}</p>
                <p><span className="font-semibold">Joined:</span> {new Date(createdAt).toLocaleDateString()}</p>
                
                <p className="font-medium">Subscription</p>
                <p
                  className={`w-fit cursor-default select-none rounded-md border px-2 py-1 font-light ${
                    role === "admin" || subscription
                      ? "border-green-500 text-green-500"
                      : "border-red-500 text-red-500"
                  }`}
                >
                  {(role === "admin" || subscription) ? "Subscribed" : "Free User"}
                </p>

              </div>
             
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-700">User not found</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
