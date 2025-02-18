import { CheckCircle, XCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Plans() {
  const navigate = useNavigate();

  const features = [
    { feature: "Access to basic articles", free: true, premium: true },
    { feature: "Ad-free experience", free: false, premium: true },
    { feature: "Access to premium articles", free: false, premium: true },
    { feature: "Priority customer support", free: false, premium: true },
    { feature: "Monthly newsletters", free: true, premium: true },
  ];

  return (
    <div className="mt-8 mb-7">
      <h2 className="text-3xl font-bold text-center ">
        ** Choose Your Plan **
      </h2>
      <div className=" py-10 mt-5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className=" shadow-lg rounded-lg p-6 border">
              <h2 className="text-2xl font-bold mb-4">Free Plan</h2>
              <ul className="text-left mb-6">
                {features.map((item, index) => (
                  <li key={index} className="flex items-center mb-3">
                    {item.free ? (
                      <CheckCircle className="text-green-500 w-5 h-5 mr-3" />
                    ) : (
                      <XCircle className="text-red-500 w-5 h-5 mr-3" />
                    )}
                    <span>{item.feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/subscription")}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
              >
                Subscribe
              </button>
            </div>

            {/* Premium Plan */}
            <div className=" shadow-lg rounded-lg p-6 border">
              <h2 className="text-2xl font-bold mb-4">Premium Plan</h2>
              <ul className="text-left mb-6">
                {features.map((item, index) => (
                  <li key={index} className="flex items-center mb-3">
                    {item.premium ? (
                      <CheckCircle className="text-green-500 w-5 h-5 mr-3" />
                    ) : (
                      <XCircle className="text-red-500 w-5 h-5 mr-3" />
                    )}
                    <span>{item.feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/subscription")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
