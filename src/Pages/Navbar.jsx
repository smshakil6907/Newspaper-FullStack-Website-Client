import React from "react";
import { FcNews } from "react-icons/fc";
import { NavLink } from "react-router-dom";

export default function Navbar() {
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
              <NavLink>Home</NavLink>
            </li>
            <li>
              <NavLink>Add Articles</NavLink>
            </li>
            <li>
              <NavLink>All Articles</NavLink>
            </li>
            <li>
              <NavLink>Subscription</NavLink>
            </li>
            <li>
              <NavLink>My Articles</NavLink>
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
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
}
