import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hoks/useAxiosPublic";
import useSubscribe from "../Hoks/useSubscribe";
import { AuthContext } from "../Provider/AuthProvider";

export default function AllArticles() {
  const axiosPublic = useAxiosPublic();
  const { setUser, user } = useContext(AuthContext);
  const [isSubscribe] = useSubscribe();
  // console.log(user);

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

  const articles = data.filter((article) => article.status === "approved");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-md p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Articles</h1>

        {/* Search and Filter */}
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
          />
          <select
            value={publisherFilter}
            onChange={(e) => setPublisherFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-1/4"
          >
            <option value="">All Publishers</option>
            {[...new Set(articles.map((article) => article.publisher))].map(
              (publisher) => (
                <option key={publisher} value={publisher}>
                  {publisher}
                </option>
              )
            )}
          </select>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article._id}
              className={`border rounded-md shadow-md p-4 ${
                article.isPremium ? "bg-yellow-300" : "bg-white"
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
              {isSubscribe ? (
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
              {/* <button
                onClick={() =>
                  article.isPremium && !user?.isSubscribed
                    ? null
                    : navigate(`/articleDetails/${article._id}`)
                }
                className={`px-4 py-2 text-white font-bold rounded-md w-full ${
                  article.isPremium && !user?.isSubscribed
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={article.isPremium && !user?.isSubscribed}
              >
                {article.isPremium && !user?.isSubscribed
                  ? "Subscribe to Access"
                  : "View Details"}
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
