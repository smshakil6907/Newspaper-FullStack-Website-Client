import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../MainLayout/Dashboard";
import Main from "../MainLayout/Main";
import AddArticles from "../Pages/AddArticles";
import AllArticles from "../Pages/AllArticles";
import AddPublisher from "../Pages/Dashboard/AddPublisher";
import AllArticle from "../Pages/Dashboard/AllArticle";
import Users from "../Pages/Dashboard/Users";
import Details from "../Pages/Details";
import ArticleDetailsPage from "../Pages/Home/ArticleDetailsPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Home/Login";
import MyArticles from "../Pages/MyArticles";
import PaymentPage from "../Pages/PaymentPage";
import Register from "../Pages/Register";
import Subscription from "../Pages/Subscription";
import UpdateArticle from "../Pages/UpdateArticle";
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
      {
        path: "/myArticles/updateArticle/:id",
        element: <UpdateArticle></UpdateArticle>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/articles/${params.id}`),
      },
      {
        path: "/myArticles/details/:id",
        element: <Details></Details>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/articles/${params.id}`),
      },
      {
        path: "articleDetails/:id",
        element: <ArticleDetailsPage></ArticleDetailsPage>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/articles/${params.id}`),
      },
      {
        path: "/payment",
        element: <PaymentPage></PaymentPage>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "users",
        element: <Users></Users>,
      },
      {
        path: "allArticles",
        element: <AllArticle></AllArticle>,
      },
      {
        path: "addPublisher",
        element: <AddPublisher></AddPublisher>,
      },
    ],
  },
]);
