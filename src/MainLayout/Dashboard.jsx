import React from "react";
import { FaArchway, FaPushed, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex">
      <div className="w-64 min-h-full bg-orange-400">
        <ul className="menu p-4 gap-4">
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
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
