import React from "react";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const { subscriptionPeriod, price } = location.state || {};

  if (!subscriptionPeriod || !price) {
    return <p>No subscription details found!</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 mb-7">
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment</h1>
        <p className="text-gray-700 mb-2">
          <strong>Subscription Period:</strong> {subscriptionPeriod}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Price:</strong> ${price}
        </p>
        <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
