import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaBook, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

export default function MyArticles() {
  const [articles, setArticles] = useState([]);
  const [declineReason, setDeclineReason] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // console.log(articles);

  useEffect(() => {
    fetch(
      `https://newspaper-fullstack-website-server.vercel.app/myArticles?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, [user?.email]);

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
      <h1 className="text-2xl font-bold mb-6 text-center">My Articles</h1>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border text-sm md:text-base">
          <thead>
            <tr className="">
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
                <td className="border px-2 py-2">{index + 1}</td>
                <td className="border px-2 py-2">{article.title}</td>
                <td className="border px-2 py-2">
                  {article.status === "approved" ? (
                    <span className="text-green-500 font-bold">Approved</span>
                  ) : article.status === "declined" ? (
                    <div className="flex flex-col md:flex-row items-center gap-2">
                      <span className="text-red-500 font-bold">Declined</span>
                      <button
                        onClick={() =>
                          openDeclineReasonModal(article.declineReason)
                        }
                        className="btn btn-sm btn-outline btn-error"
                      >
                        View Reason
                      </button>
                    </div>
                  ) : (
                    <span className="text-yellow-500 font-bold">Pending</span>
                  )}
                </td>
                <td className="border px-2 py-2">
                  {article.isPremium ? (
                    <span className="text-green-500 font-bold">Yes</span>
                  ) : (
                    "No"
                  )}
                </td>
                <td className="border px-2 py-2 flex flex-wrap gap-2">
                  <Link className="flex" to={`details/${article._id}`}>
                    <button className="btn btn-sm btn-info flex items-center gap-1">
                      <FaBook /> Details
                    </button>
                  </Link>
                  <Link className="flex" to={`updateArticle/${article._id}`}>
                    <button className="btn btn-sm btn-warning flex items-center gap-1">
                      <FaEdit /> Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="btn btn-sm btn-error flex items-center gap-1"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decline Reason Modal */}
      {declineReason && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Decline Reason</h2>
            <p className="mb-4">{selectedReason}</p>
            <button
              onClick={closeDeclineReasonModal}
              className="btn btn-sm btn-neutral w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
