import { createBrowserRouter } from "react-router-dom";
import Main from "../MainLayout/Main";
import AddArticles from "../Pages/AddArticles";
import AllArticles from "../Pages/AllArticles";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Home/Login";
import MyArticles from "../Pages/MyArticles";
import Register from "../Pages/Register";
import Subscription from "../Pages/Subscription";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addArticles",
        element: <AddArticles></AddArticles>,
      },
      {
        path: "/allArticles",
        element: <AllArticles></AllArticles>,
      },
      {
        path: "/subscription",
        element: <Subscription></Subscription>,
      },
      {
        path: "/myArticles",
        element: <MyArticles></MyArticles>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);
