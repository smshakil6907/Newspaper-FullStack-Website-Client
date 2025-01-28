import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

const ArticleDetailsPage = () => {
  const { id } = useParams();
  const article = useLoaderData();
  const [viewCount, setViewCount] = useState(article.views || 0);

  useEffect(() => {
    const incrementViewCount = async () => {
      const response = await axios.patch(
        `http://localhost:5000/articles/view/${id}`
      );
      setViewCount(response.data.viewCount);
    };
    incrementViewCount();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-md p-4">
        <img
          src={article.image || "https://via.placeholder.com/800x400"}
          alt={article.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {article.title}
        </h1>
        <p className="text-sm text-gray-500 mb-2">
          <span className="font-semibold">Publisher:</span> {article.publisher}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          <span className="font-semibold">Views:</span> {viewCount}
        </p>
        <p className="text-gray-700 leading-relaxed">{article.description}</p>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;
