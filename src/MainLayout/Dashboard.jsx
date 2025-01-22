import React from "react";
import { FaArchway, FaHome, FaPushed, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  const isAdmin = true;
  return (
    <div className="flex gap-4">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4 gap-2">
          <li>
            <NavLink to="/dashboard/users">
              <FaUsers></FaUsers>
              All Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allArticles">
              <FaArchway></FaArchway>
              All Articles
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addPublisher">
              <FaPushed></FaPushed>
              Add Publisher
            </NavLink>
          </li>
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
