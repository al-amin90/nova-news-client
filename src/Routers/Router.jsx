import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Authontication/Register";
import Login from "../Pages/Authontication/Login";
import AddArticles from "../Pages/AddArticles/AddArticles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/addArticles",
        element: <AddArticles />,
      },
      {
        path: "/allArticles",
        element: <p>comeing</p>,
      },
      {
        path: "/subscription",
        element: <p>comeing</p>,
      },
      {
        path: "/dashboard",
        element: <p>comeing</p>,
      },
      {
        path: "/myArticles",
        element: <p>comeing</p>,
      },
      {
        path: "/premiumArticles",
        element: <p>comeing</p>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
