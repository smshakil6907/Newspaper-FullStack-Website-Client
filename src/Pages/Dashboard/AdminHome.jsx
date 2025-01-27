import React, { useContext } from "react";
import { Chart } from "react-google-charts";
import { AuthContext } from "../../Provider/AuthProvider";

export default function AdminHome() {
  const { user } = useContext(AuthContext);
  const publications = [
    { name: "Publication A", articles: 2 },
    { name: "Publication B", articles: 3 },
    { name: "Publication C", articles: 5 },
  ];

  // Calculate total articles and percentages
  const totalArticles = publications.reduce(
    (sum, pub) => sum + pub.articles,
    0
  );
  const pieData = [
    ["Publication", "Percentage"],
    ...publications.map((pub) => [
      pub.name,
      (pub.articles / totalArticles) * 100,
    ]),
  ];

  // Data for Bar Chart
  const barData = [
    ["Publication", "Articles"],
    ...publications.map((pub) => [pub.name, pub.articles]),
  ];

  // Data for Line Chart
  const lineData = [
    ["Publication", "Articles"],
    ...publications.map((pub, index) => [`${pub.name}`, pub.articles]),
  ];
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        <span>Hi, Welcome </span>
        {user?.displayName ? user.displayName : "Back"}
      </h1>

      {/* Pie Chart */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Dynamic Pie Chart
        </h2>
        <Chart
          chartType="PieChart"
          data={pieData}
          options={{
            title: "Publication Articles Distribution",
            pieHole: 0.4,
          }}
          width={"100%"}
          height={"400px"}
        />
      </div>

      {/* Bar Chart */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Bar Chart</h2>
        <Chart
          chartType="BarChart"
          data={barData}
          options={{
            title: "Articles Count by Publication",
            hAxis: {
              title: "Articles",
            },
            vAxis: {
              title: "Publication",
            },
          }}
          width={"100%"}
          height={"400px"}
        />
      </div>

      {/* Line Chart */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Line Chart</h2>
        <Chart
          chartType="LineChart"
          data={lineData}
          options={{
            title: "Articles Over Publications",
            hAxis: {
              title: "Publications",
            },
            vAxis: {
              title: "Articles",
            },
          }}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  );
}
