import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllPublisher from "./AllPublisher";
import Banner from "./Banner";
import BreakingNewsTicker from "./BreakingNewsTicker";
import EditorsPicks from "./EditorsPicks";
import Plans from "./Plans";
import StatisticPage from "./StatisticPage";
import TrendingArticle from "./TrendingArticle";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubscription = () => {
    navigate("/subscription");
  };

  const editorPicks = [
    {
      id: 4,
      title: "Editor's Pick 1",
      image: "image_url_4",
      summary: "Summary 4",
    },
    {
      id: 5,
      title: "Editor's Pick 2",
      image: "image_url_5",
      summary: "Summary 5",
    },
  ];

  return (
    <div>
      <BreakingNewsTicker></BreakingNewsTicker>
      <Banner></Banner>
      <TrendingArticle></TrendingArticle>
      <AllPublisher></AllPublisher>
      <StatisticPage></StatisticPage>
      <Plans></Plans>
      <EditorsPicks></EditorsPicks>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Subscribe Now!
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Join our subscription plan and unlock premium content.
            </p>
            <button
              onClick={handleSubscription}
              className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              Go to Subscription Page
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 px-4 py-2 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
