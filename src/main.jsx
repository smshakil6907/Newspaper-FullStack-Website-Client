import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { router } from "./Routes/router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster></Toaster>
    <AuthProvider>
      <div className="max-w-screen-lg mx-auto">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </AuthProvider>
  </StrictMode>
);
