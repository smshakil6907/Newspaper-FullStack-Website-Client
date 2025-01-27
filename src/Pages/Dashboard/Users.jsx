import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hoks/useAxiosSecure";

export default function Users() {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const articlePerPage = 4; // Items per page

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const numberOfPages = Math.ceil(users.length / articlePerPage);
  const pages = [...Array(numberOfPages).keys()];

  // Slice users based on current page
  const paginatedUsers = users.slice(
    currentPage * articlePerPage,
    currentPage * articlePerPage + articlePerPage
  );

  // Make admin
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Delete user
  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-2xl">All Users</h2>
        <h2 className="text-2xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{currentPage * articlePerPage + index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-lg bg-orange-600"
                    >
                      <FaUsers className="text-white text-2xl" />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mb-5">
        <button onClick={handlePrevPage} className="mr-3 btn btn-outline">
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn btn-outline ml-3 ${
              currentPage === page ? "bg-orange-400" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={handleNextPage} className="ml-3 btn btn-outline">
          Next
        </button>
      </div>
    </div>
  );
}
