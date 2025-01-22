import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaBook, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

export default function MyArticles() {
  const [articles, setArticles] = useState([]);
  const [declineReason, setDeclineReason] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // console.log(articles);

  useEffect(() => {
    fetch(`http://localhost:5000/myArticles?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, [user?.email]);

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

  const handleDetails = (id) => {
    navigate(`/articleDetails/${id}`);
  };

  const openDeclineReasonModal = (reason) => {
    setSelectedReason(reason);
    setDeclineReason(true);
  };

  const closeDeclineReasonModal = () => {
    setDeclineReason(false);
    setSelectedReason("");
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Articles</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">isPremium</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{article.title}</td>
                <td className="border px-4 py-2">
                  {article.status === "approved" && (
                    <span className="text-green-500 font-bold">Approved</span>
                  )}
                  <span className="text-yellow-500 font-bold">Pending</span>
                  {article.status === "declined" && (
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 font-bold">Declined</span>
                      <button
                        onClick={() => openDeclineReasonModal(article.reason)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        View Reason
                      </button>
                    </div>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {article.isPremium ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2 flex gap-2">
                  <Link to={`details/${article._id}`}>
                    <button className="btn btn-sm btn-info">
                      {" "}
                      <FaBook></FaBook> Details
                    </button>
                  </Link>
                  <Link to={`updateArticle/${article._id}`}>
                    <button className="btn btn-sm btn-warning flex items-center gap-1">
                      <FaEdit />
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="btn btn-sm btn-error flex items-center gap-1"
                  >
                    <FaTrashAlt />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decline Reason Modal */}
      {declineReason && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Decline Reason</h2>
            <p className="mb-4">{selectedReason}</p>
            <button
              onClick={closeDeclineReasonModal}
              className="btn btn-sm btn-neutral"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
