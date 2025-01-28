import React from "react";
import { FaArchway, FaHome, FaPushed, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  const isAdmin = true;

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Sidebar */}
      <div className="w-full lg:w-64 lg:min-h-screen bg-orange-400 lg:sticky lg:top-0">
        <ul className="menu p-4 gap-2">
          <li>
            <NavLink
              to="/dashboard/adminHome"
              className="flex items-center gap-2 text-white hover:bg-orange-500 rounded-md p-2"
            >
              <FaHome />
              <span>Admin Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/users"
              className="flex items-center gap-2 text-white hover:bg-orange-500 rounded-md p-2"
            >
              <FaUsers />
              <span>All Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/allArticles"
              className="flex items-center gap-2 text-white hover:bg-orange-500 rounded-md p-2"
            >
              <FaArchway />
              <span>All Articles</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/addPublisher"
              className="flex items-center gap-2 text-white hover:bg-orange-500 rounded-md p-2"
            >
              <FaPushed />
              <span>Add Publisher</span>
            </NavLink>
          </li>
          <div className="divider bg-white"></div>
          <li>
            <NavLink
              to="/"
              className="flex items-center gap-2 text-white hover:bg-orange-500 rounded-md p-2"
            >
              <FaHome />
              <span>Home</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
