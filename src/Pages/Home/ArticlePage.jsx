import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Mock data and methods
const articles = [
  { id: "1", title: "Breaking News 1", views: 50 },
  { id: "2", title: "Trending Story 2", views: 75 },
  { id: "3", title: "Popular Article 3", views: 30 },
];

const updateArticleView = (id) => {
  const article = articles.find((article) => article.id === id);
  if (article) {
    article.views += 1;
  }
};

const getTrendingArticles = () => {
  return [...articles].sort((a, b) => b.views - a.views).slice(0, 3);
};

// Component
const ArticlePage = () => {
  const { id } = useParams();
  const [trendingArticles, setTrendingArticles] = useState([]);

  useEffect(() => {
    if (id) {
      // Update the view count for the current article
      updateArticleView(id);

      // Update trending articles
      const updatedTrending = getTrendingArticles();
      setTrendingArticles(updatedTrending);
    }
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Article Details</h1>
      <div className="mb-8">
        {articles.map((article) =>
          article.id === id ? (
            <div key={article.id}>
              <h2 className="text-2xl font-semibold">{article.title}</h2>
              <p>Views: {article.views}</p>
            </div>
          ) : null
        )}
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Trending Articles</h2>
        <ul className="space-y-2">
          {trendingArticles.map((article) => (
            <li key={article.id} className="p-2 bg-gray-100 rounded">
              <h3 className="font-semibold">{article.title}</h3>
              <p>Views: {article.views}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ArticlePage;
