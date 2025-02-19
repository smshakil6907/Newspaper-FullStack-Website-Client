import React from "react";

export default function BreakingNewsTicker() {
  const headlines = [
    "Global Markets Rally Amid Positive Economic Data",
    "Scientists Discover New Exoplanet in Habitable Zone",
    "Tech Giants Announce Partnership on AI Development",
    "Local Elections Witness Record Voter Turnout",
  ];

  return (
    <div className="bg-red-500 text-white py-2 px-4 shadow-lg">
      <h3 className="text-lg font-bold mb-2">Breaking News</h3>
      <div className="overflow-hidden whitespace-nowrap">
        <marquee behavior="scroll" direction="left">
          {headlines.map((headline, index) => (
            <span key={index} className="mx-4">
              {headline}
            </span>
          ))}
        </marquee>
      </div>
    </div>
  );
}
