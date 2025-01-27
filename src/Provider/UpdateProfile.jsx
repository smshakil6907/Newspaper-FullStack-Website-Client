// UpdateProfile.js
import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "name" ? setName(value) : setPhotoURL(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:w-[50%] md:w-[50%] w-[80%] bg-base-200 mt-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            placeholder="Enter your name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Photo URL
          </label>
          <input
            name="photoURL"
            type="text"
            onChange={handleChange}
            placeholder="Enter your photo URL"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary bg-green-800 hover:bg-green-800 border-none text-white py-2 px-4 rounded"
        >
          Update Information
        </button>
      </form>
    </div>
  );
}
