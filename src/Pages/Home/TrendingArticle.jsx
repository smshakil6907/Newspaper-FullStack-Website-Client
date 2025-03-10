import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hoks/useAxiosPublic";

export default function TrendingArticles() {
  const [trending, setTrending] = useState([]);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosPublic.get("/articles");
        const approvedArticles = response.data.filter(
          (article) => article.status === "approved"
        );
        const sortedTrending = approvedArticles
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 6);
        setTrending(sortedTrending);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [axiosPublic]);

  return (
    <div className="p-4 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Trending Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trending.map((article) => (
          <div key={article._id} className="border rounded-md shadow-md p-4">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Publisher: {article.publisher}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Views: {article.views || 0}
            </p>
            <p className="text-gray-700 mb-4">{article.description}</p>
            <button
              onClick={() => navigate(`/articleDetails/${article._id}`)}
              className="px-4 py-2 text-white font-bold rounded-md w-full bg-blue-500 hover:bg-blue-600"
            >
              See More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
