import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hoks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPublisher = () => {
  const [publisherName, setPublisherName] = useState("");
  const [publisherLogo, setPublisherLogo] = useState(null);
  const axiosPublic = useAxiosPublic();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", publisherLogo);

      const imageRes = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (imageRes.data.success) {
        const logoUrl = imageRes.data.data.display_url;
        const publisherData = {
          name: publisherName,
          logo: logoUrl,
        };
        console.log(publisherData);
        const res = await axiosPublic.post("/publisher", publisherData);
        console.log(res.data);
        Swal.fire({
          title: "Success",
          text: "Publisher added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setPublisherName("");
        setPublisherLogo(null);
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
