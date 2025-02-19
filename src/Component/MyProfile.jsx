import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

export default function MyProfile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="p-6 md:p-12 lg:p-16">
      <div className="max-w-3xl mx-auto p-6 border rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome, {user?.displayName}
        </h1>

        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL}
            className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4"
          />
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Profile Information</h2>
            </div>
            <div className="">
              <p>
                <strong>Name:</strong> {user?.displayName}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>
            <div className="mt-6 text-center">
              <NavLink
                to="/updateProfile"
                className="btn bg-blue-500 hover:bg-blue-700 border-none text-white px-6 py-3"
              >
                Update Profile
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
