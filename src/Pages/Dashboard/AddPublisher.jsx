import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AddPublisher = () => {
  const [publisherName, setPublisherName] = useState("");
  const [publisherLogo, setPublisherLogo] = useState(null);

  const imageHostingAPI = "https://api.imgbb.com/1/upload"; // Replace with your API endpoint
  const imageHostingKey = "your_imgbb_api_key"; // Replace with your actual API key

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!publisherName || !publisherLogo) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Upload the image to the image hosting service
    const formData = new FormData();
    formData.append("image", publisherLogo);

    try {
      const imageRes = await axios.post(
        `${imageHostingAPI}?key=${imageHostingKey}`,
        formData
      );
      if (imageRes.data.success) {
        const publisherData = {
          name: publisherName,
          logo: imageRes.data.data.display_url,
        };

        // Save the publisher data to the backend
        const res = await axios.post("/api/publishers", publisherData); // Replace with your API endpoint
        if (res.data.success) {
          Swal.fire({
            title: "Success",
            text: "Publisher added successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          setPublisherName("");
          setPublisherLogo(null);
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add publisher. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error adding publisher:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Publisher</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="publisherName"
            >
              Publisher Name
            </label>
            <input
              type="text"
              id="publisherName"
              value={publisherName}
              onChange={(e) => setPublisherName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter publisher name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="publisherLogo"
            >
              Publisher Logo
            </label>
            <input
              type="file"
              id="publisherLogo"
              accept="image/*"
              onChange={(e) => setPublisherLogo(e.target.files[0])}
              className="w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Publisher
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPublisher;
