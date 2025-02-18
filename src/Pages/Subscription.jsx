import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const [subscriptionPeriod, setSubscriptionPeriod] = useState("");
  const navigate = useNavigate();

  const subscriptionPrices = {
    "1 minute": 1, // Price for 1 minute
    "5 days": 10, // Price for 5 days
    "10 days": 20, // Price for 10 days
  };

  const handleSubscribe = () => {
    if (!subscriptionPeriod) {
      alert("Please select a subscription period!");
      return;
    }
    navigate("/payment", {
      state: {
        subscriptionPeriod,
        price: subscriptionPrices[subscriptionPeriod],
      },
    });
  };

  return (
    <div className="flex flex-col items-center p-6 mt-4">
      {/* Attractive Banner */}
      <div className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-center py-10 rounded-lg mb-6">
        <h1 className="text-4xl font-bold">Subscribe Now!</h1>
        <p className="text-lg mt-2">
          Enjoy premium features with our subscription plans!
        </p>
      </div>

      {/* Subscription Options */}
      <div className=" p-6 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          Choose Your Subscription
        </h2>
        <label
          htmlFor="subscription-period"
          className="block text-gray-500 mb-2"
        >
          Select Subscription Period:
        </label>
        <select
          id="subscription-period"
          value={subscriptionPeriod}
          onChange={(e) => setSubscriptionPeriod(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        >
          <option value="">-- Select --</option>
          <option value="1 minute">1 Minute - $1</option>
          <option value="5 days">5 Days - $10</option>
          <option value="10 days">10 Days - $20</option>
        </select>

        <button
          onClick={handleSubscribe}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default Subscription;
