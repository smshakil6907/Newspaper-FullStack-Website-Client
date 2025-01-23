import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllArticle = () => {
  const [articles, setArticles] = useState([]);
  const [declineReason, setDeclineReason] = useState("");

  // Fetch articles from API
  useEffect(() => {
    fetch("http://localhost:5000/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  console.log(articles);

  const handleApprove = (id) => {
    const data = {
      status: "approved",
    };
    fetch(`http://localhost:5000/articles/approve/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your article has been approved",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // Handle Decline Article
  const handleDecline = (articleId) => {
    Swal.fire({
      title: "Reason for Decline",
      input: "textarea",
      inputPlaceholder: "Write your reason here...",
      showCancelButton: true,
      confirmButtonText: "Submit",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reason = result.value;
        try {
          const response = await axios.put(
            `/api/articles/${articleId}/decline`,
            { reason }
          );
          if (response.data.success) {
            setArticles((prev) =>
              prev.map((article) =>
                article.id === articleId
                  ? { ...article, status: "declined", declineReason: reason }
                  : article
              )
            );
            Swal.fire("Declined!", "Article has been declined.", "success");
          }
        } catch (error) {
          console.error("Error declining article:", error);
          Swal.fire("Error!", "Failed to decline the article.", "error");
        }
      }
    });
  };

  // Handle Delete Article
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/articles/${id}`);
        setArticles((prev) => prev.filter((article) => article._id !== id));
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  // Handle Make Premium
  const handleMakePremium = (id) => {
    const data = {
      isPremium: "Yes",
    };
    fetch(`http://localhost:5000/articles/isPremium/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your article has been Premium",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-md p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Articles</h1>

        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Author</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Photo</th>
              <th className="border border-gray-300 px-4 py-2">Posted Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id} className="hover:bg-gray-100">
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
                      onClick={() => handleDecline(article.id)}
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
  );
};

export default AllArticle;
