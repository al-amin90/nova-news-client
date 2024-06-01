import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";

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
        element: <p>comeing</p>,
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
        element: <p>comeing</p>,
      },
      {
        path: "/register",
        element: <p>comeing</p>,
      },
    ],
  },
]);

export default router;
