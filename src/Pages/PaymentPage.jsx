import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hoks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { subscriptionPeriod, price } = location.state || {};
  const { user } = useContext(AuthContext);

  if (!subscriptionPeriod || !price) {
    return <p>No subscription details found!</p>;
  }

  const handleSubscription = (email) => {
    fetch("http://localhost:5000/users/subscribe", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Subscription Successful!",
            text: "You now have access to premium content.",
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Subscription Failed",
            text: data.message || "Something went wrong.",
            showConfirmButton: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating subscription:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again later.",
          showConfirmButton: true,
        });
      });
  };

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
        <button
          onClick={() => handleSubscription(user?.email)}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
