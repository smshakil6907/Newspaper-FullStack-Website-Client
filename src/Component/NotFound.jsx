import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="text-center">
        <div className="mt-8">
          <img
            src="https://i.ibb.co.com/F0Jf2qJ/Not-Found.jpg"
            alt="Lost in Space"
            className="w-80 md:w-96 mx-auto rounded-lg shadow-lg"
          />
        </div>
        <p className="text-2xl md:text-3xl font-light mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-lg md:text-xl text-gray-200">
          It might have been moved or deleted.
        </p>
        <button
          onClick={handleGoHome}
          className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
