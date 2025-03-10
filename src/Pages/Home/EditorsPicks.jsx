import React from "react";

export default function EditorsPicks() {
  const articles = [
    {
      title: "The Impact of Climate Change on Coastal Cities",
      image:
        "https://i.ibb.co.com/LtcsZNJ/corporate-workers-brainstorming-together.jpg",
      description: "A detailed analysis of rising sea levels.",
    },
    {
      title: "Top 10 Books to Read This Year",
      image: "https://i.ibb.co.com/Rh64jfB/books.webp",
      description: "A curated list of must-reads for book lovers.",
    },
    {
      title: "How Technology is Shaping Education",
      image: "https://i.ibb.co.com/BPjxPnF/bg.webp",
      description: "Exploring the future of learning.",
    },
  ];

  return (
    <div className="rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-2xl font-bold mb-4 text-center">Editor's Pick</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="border rounded-md shadow-sm hover:shadow-md transition"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-32 object-cover rounded-t-md"
            />
            <div className="p-3">
              <h4 className="text-lg font-semibold">{article.title}</h4>
              <p className="text-gray-600 text-sm">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
