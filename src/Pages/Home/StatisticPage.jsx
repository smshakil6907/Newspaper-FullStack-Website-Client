import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import useAxiosSecure from "../../Hoks/useAxiosSecure";

export default function StatisticPage() {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  const totalUsers = users.length;
  const premiumUsers = users.filter((user) => user.isSubscribed).length;
  const normalUsers = totalUsers - premiumUsers;

  return (
    <div className="mt-5">
      <h2 className="text-3xl font-bold text-center mb-3">
        All Users Statics Count
      </h2>
      <div className=" flex flex-col items-center justify-center p-3 mt-5">
        <h1 className="text-3xl font-bold mb-6">User Statistics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
          {/* Total Users */}
          <div className=" shadow-lg rounded-lg p-6 text-center border">
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-4xl font-bold text-blue-500">
              <CountUp end={totalUsers} duration={2} />
            </p>
          </div>

          {/* Normal Users */}
          <div className=" shadow-lg rounded-lg p-6 text-center border">
            <h2 className="text-xl font-semibold">Normal Users</h2>
            <p className="text-4xl font-bold text-green-500">
              <CountUp end={normalUsers} duration={2} />
            </p>
          </div>

          {/* Premium Users */}
          <div className=" shadow-lg rounded-lg p-6 text-center border">
            <h2 className="text-xl font-semibold">Premium Users</h2>
            <p className="text-4xl font-bold text-yellow-500">
              <CountUp end={premiumUsers} duration={2} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
