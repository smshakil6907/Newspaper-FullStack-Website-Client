import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hoks/useAxiosPublic";

export default function AllPublisher() {
  const [publishers, setPublishers] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchPublishers = async () => {
      const response = await axiosPublic.get("/publisher");
      setPublishers(response.data);
    };
    fetchPublishers();
  }, [axiosPublic]);

  return (
    <div className="">
      <h2 className="text-3xl font-bold text-center mb-3">All Publishers</h2>
      {publishers.map((publisher) => (
        <div className="border shadow-md rounded-lg p-4 flex items-center gap-4 bg-white">
          <img
            src={publisher.logo}
            alt=""
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {publisher.name}
            </h3>
            <p className="text-gray-500">ID: {publisher._id}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
