import React from "react";

export default function NewsUpdates() {
  const newsArticles = [
    {
      id: 1,
      title: "New Feature Released!",
      date: "Feb 10, 2025",
      description:
        "We just launched an exciting new feature. Check it out now!",
    },
    {
      id: 2,
      title: "Special Discount This Week",
      date: "Feb 8, 2025",
      description: "Grab exclusive discounts on our latest products this week.",
    },
    {
      id: 3,
      title: "Upcoming Webinar",
      date: "Feb 5, 2025",
      description:
        "Join us for a live session on industry trends and insights.",
    },
  ];

  return (
    <section className="bg-gray-100 py-10 px-5 rounded-lg mb-4">
      <h2 className="text-2xl font-bold text-gray-700 text-center">
        Latest News & Updates
      </h2>
      <p className="text-gray-600 text-center mt-2">
        Stay informed with our latest announcements.
      </p>
      <div className="mt-6 space-y-4">
        {newsArticles.map((article) => (
          <div key={article.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <p className="text-gray-500 text-sm">{article.date}</p>
            <p className="text-gray-600 mt-2">{article.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
