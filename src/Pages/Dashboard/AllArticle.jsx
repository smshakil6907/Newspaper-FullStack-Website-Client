import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllArticle = () => {
  const [articles, setArticles] = useState([]);
  const [declineReason, setDeclineReason] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const articlePerPage = 4;

  // Fetch articles from API
  useEffect(() => {
    fetch("https://newspaper-fullstack-website-server.vercel.app/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  // console.log(articles);

  const handleApprove = (id) => {
    const data = {
      status: "approved",
    };
    fetch(
      `https://newspaper-fullstack-website-server.vercel.app/articles/approve/${id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your article has been approved",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const numberOfPages = Math.ceil(articles.length / articlePerPage);
  const pages = [...Array(numberOfPages).keys()];

  // Handle Decline Article
  const handleDecline = (id) => {
    Swal.fire({
      title: "Reason for Decline",
      input: "textarea",
      inputPlaceholder: "Write your reason here...",
      showCancelButton: true,
      confirmButtonText: "Submit",
    }).then((result) => {
      const reason = result.value || "No reason provided";
      const data = {
        status: "declined",
        declineReason: reason,
      };
      // console.log(data);
      fetch(
        `https://newspaper-fullstack-website-server.vercel.app/articles/decline/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log("Response:", data);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your article has been decline",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };

  // Handle Delete Article
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://newspaper-fullstack-website-server.vercel.app/articles/${id}`
          );
          setArticles((prev) => prev.filter((article) => article._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "The article has been deleted.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error("Error deleting article:", error);
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the article. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  // Handle Make Premium
  const handleMakePremium = (id) => {
    const data = {
      isPremium: "Yes",
    };
    fetch(
      `https://newspaper-fullstack-website-server.vercel.app/articles/isPremium/${id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your article has been Premium",
          showConfirmButton: false,
          timer: 1500,
        });
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

  const paginatedUsers = articles.slice(
    currentPage * articlePerPage,
    currentPage * articlePerPage + articlePerPage
  );

  return (
    <div>
      <div className="min-h-screen p-6 overflow-x-auto">
        <div className="max-w-7xl mx-auto shadow-lg rounded-md p-4">
          <h1 className="text-2xl font-bold mb-6">All Articles</h1>

          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Author</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Photo</th>
                <th className="border border-gray-300 px-4 py-2">
                  Posted Date
                </th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((article) => (
                <tr key={article._id} className="">
                  <td className="border border-gray-300 px-4 py-2">
                    {article.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {article.authorName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {article.authorEmail}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <img
                      src={
                        article.authorPhoto || "https://via.placeholder.com/50"
                      }
                      alt="Author"
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {new Date(article.postedDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {article.status === "approved" ? (
                      <span className="text-green-600 font-bold">Approved</span>
                    ) : article.status === "declined" ? (
                      <span className="text-red-600 font-bold">Declined</span>
                    ) : (
                      <span className="text-yellow-600 font-bold">Pending</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center space-y-2">
                    {article.status !== "approved" && (
                      <button
                        onClick={() => handleApprove(article._id)}
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                    )}

                    {article.status !== "declined" && (
                      <button
                        onClick={() => handleDecline(article._id)}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                      >
                        Decline
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(article._id)}
                      className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
                    >
                      Delete
                    </button>

                    {article.isPremium !== "Yes" && (
                      <button
                        onClick={() => handleMakePremium(article._id)}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                      >
                        Make Premium
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mb-3 mt-3">
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
};

export default AllArticle;
