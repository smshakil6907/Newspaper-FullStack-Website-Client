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
        `https://newspaper-fullstack-website-server.vercel.app/articles/view/${id}`
      );
      setViewCount(response.data.viewCount);
    };
    incrementViewCount();
  }, [id]);

  return (
    <div className=" p-6">
      <div className="max-w-4xl mx-auto shadow-lg rounded-md p-4">
        <img
          src={article.image || "https://via.placeholder.com/800x400"}
          alt={article.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <p className="text-sm  mb-2">
          <span className="font-semibold">Publisher:</span> {article.publisher}
        </p>
        <p className="text-sm  mb-6">
          <span className="font-semibold">Views:</span> {viewCount}
        </p>
        <p className=" leading-relaxed">{article.description}</p>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;
