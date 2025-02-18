import React from "react";
import { useLoaderData } from "react-router-dom";

export default function Details() {
  const details = useLoaderData();
  const { title, email, publisher, description, image } = details;
  return (
    <div className="max-w-4xl mx-auto p-4 shadow-lg rounded-md mb-8 mt-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <p className="mb-2">
        <strong>Publisher:</strong> {publisher}
      </p>
      <p className=" mb-2">
        <strong>Email:</strong> {email}
      </p>
      <p className="">{description}</p>
    </div>
  );
}
