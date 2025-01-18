import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../MainLayout/Dashboard";
import Main from "../MainLayout/Main";
import AddArticles from "../Pages/AddArticles";
import AllArticles from "../Pages/AllArticles";
import Users from "../Pages/Dashboard/Users";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Home/Login";
import MyArticles from "../Pages/MyArticles";
import Register from "../Pages/Register";
import Subscription from "../Pages/Subscription";
import PrivetRoutes from "../Routes/PrivetRoutes";

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
        element: (
          <PrivetRoutes>
            <AddArticles></AddArticles>
          </PrivetRoutes>
        ),
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
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "users",
        element: <Users></Users>
      }
    ]
  },
]);
