import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hoks/useAxiosPublic";
import useSubscribe from "../Hoks/useSubscribe";
import { AuthContext } from "../Provider/AuthProvider";

export default function AllArticles() {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [isSubscribe] = useSubscribe();
  const [searchTerm, setSearchTerm] = useState("");
  const [publisherFilter, setPublisherFilter] = useState("");
  const navigate = useNavigate();

  const { data = [], refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosPublic.get("/articles");
      return res.data;
    },
  });

  // Filter approved articles first
  let filteredArticles = data.filter(
    (article) => article.status === "approved"
  );

  // Apply search filter
  if (searchTerm) {
    filteredArticles = filteredArticles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply publisher filter
  if (publisherFilter) {
    filteredArticles = filteredArticles.filter(
      (article) => article.publisher === publisherFilter
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto shadow-lg rounded-md p-4">
        <h1 className="text-2xl font-bold mb-6">All Articles</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2"
          />
          <select
            value={publisherFilter}
            onChange={(e) => setPublisherFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/4"
          >
            <option value="">All Publishers</option>
            {[...new Set(data.map((article) => article.publisher))].map(
              (publisher) => (
                <option key={publisher} value={publisher}>
                  {publisher}
                </option>
              )
            )}
          </select>
        </div>

        {/* Articles List */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article._id}
                className={`border rounded-md shadow-md p-4 ${
                  article.isPremium ? "bg-gray-300" : ""
                }`}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-bold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-2">
                  Publisher: {article.publisher}
                </p>
                <p className="text-gray-700 mb-4">{article.description}</p>
                {isSubscribe || !article.isPremium ? (
                  <button
                    onClick={() => navigate(`/articleDetails/${article._id}`)}
                    className="px-4 py-2 text-white font-bold rounded-md w-full bg-blue-500 hover:bg-blue-600"
                  >
                    View Details
                  </button>
                ) : (
                  <button className="px-4 py-2 text-white font-bold rounded-md w-full bg-gray-400 cursor-not-allowed">
                    Subscribe to Access
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">No articles found.</p>
        )}
      </div>
    </div>
  );
}
