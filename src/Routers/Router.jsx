import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Authontication/Register";
import Login from "../Pages/Authontication/Login";
import AddArticles from "../Pages/AddArticles/AddArticles";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import AdminRouter from "./AdminRouter";
import AllArticles from "../Pages/AllArticles/AllArticles";
import ManageArticles from "../Pages/Dashboard/ManageArticles";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import MyArticles from "../Pages/MyArticles/MyArticles";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import axios from "axios";
import { baseURL } from "../api/utlils";
import AddPublisher from "../Pages/Dashboard/AddPublisher";

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
        element: (
          <PrivateRouter>
            <AddArticles isAdd={true} />
          </PrivateRouter>
        ),
      },
      {
        path: "/updateArticle/:id",
        element: (
          <PrivateRouter>
            <AddArticles isAdd={false} />
          </PrivateRouter>
        ),
        loader: ({ params }) => axios.get(`${baseURL}/article/${params.id}`),
      },
      {
        path: "/allArticles",
        element: <AllArticles></AllArticles>,
      },
      {
        path: "/subscription",
        element: (
          <PrivateRouter>
            <p>comeing</p>
          </PrivateRouter>
        ),
      },
      {
        path: "/myArticles",
        element: (
          <PrivateRouter>
            <MyArticles></MyArticles>
          </PrivateRouter>
        ),
      },
      {
        path: "/premiumArticles",
        element: (
          <PrivateRouter>
            <PremiumArticles></PremiumArticles>
          </PrivateRouter>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRouter>
            <p>comeing</p>
          </PrivateRouter>
        ),
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
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <AdminRouter>
          <Dashboard />
        </AdminRouter>
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: <p>About</p>,
      },
      {
        path: "allusers",
        element: (
          <AdminRouter>
            <ManageUsers />
          </AdminRouter>
        ),
      },
      {
        path: "manageArticle",
        element: (
          <AdminRouter>
            <ManageArticles></ManageArticles>
          </AdminRouter>
        ),
      },
      {
        path: "addPublisher",
        element: (
          <AdminRouter>
            <AddPublisher></AddPublisher>
          </AdminRouter>
        ),
      },
    ],
  },
]);

export default router;
