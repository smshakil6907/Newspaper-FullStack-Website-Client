import React, { useContext } from "react";
import { FcNews } from "react-icons/fc";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import image from "../assets/1144760.png";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/addArticles">Add Articles</NavLink>
            </li>
            <li>
              <NavLink to="/allArticles">All Articles</NavLink>
            </li>
            <li>
              <NavLink to="/subscription">Subscription</NavLink>
            </li>
            <li>
              <NavLink to="/myArticles">My Articles</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/users">Dashboard</NavLink>
            </li>
          </ul>
        </div>
        <a className="flex items-center gap-3 text-xl font-bold">
          <FcNews className="text-3xl" />
          Hot News
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/addArticles">Add Articles</NavLink>
          </li>
          <li>
            <NavLink to="/allArticles">All Articles</NavLink>
          </li>
          <li>
            <NavLink to="/subscription">Subscription</NavLink>
          </li>
          <li>
            <NavLink to="/myArticles">My Articles</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/users">Dashboard</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div>
          {user?.email ? (
            <div>
              <img
                src={user?.photoURL && user?.photoURL}
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full">
              <img src={image} alt="" />
            </div>
          )}
        </div>
        <div className="mr-4"></div>
        {user && user?.email ? (
          <button onClick={logOut} className="btn btn-secondary text-white">
            Log-out
          </button>
        ) : (
          <Link to="/login" className="btn btn-secondary text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
