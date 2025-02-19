import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hoks/useAxiosPublic";
import useSubscribe from "../Hoks/useSubscribe";
import { AuthContext } from "../Provider/AuthProvider";

export default function PremiumArticle() {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [isSubscribe] = useSubscribe();
  const navigate = useNavigate();

  const { data = [], refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosPublic.get("/articles");
      return res.data;
    },
  });

  const articles = data.filter((article) => article.isPremium === "Yes");

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto shadow-lg rounded-md p-4">
        <h1 className="text-2xl font-bold mb-6">Premium Articles</h1>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article._id}
              className=" shadow-md p-4 rounded-lg overflow-hidden"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <p className=" text-sm mb-2">Publisher: {article.publisher}</p>
                <p className=" text-sm mb-4">
                  {article.description.slice(0, 100)}...
                </p>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
