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
            <AddArticles />
          </PrivateRouter>
        ),
      },
      {
        path: "/allArticles",
        element: <p>comeing</p>,
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
            <p>comeing</p>
          </PrivateRouter>
        ),
      },
      {
        path: "/premiumArticles",
        element: (
          <PrivateRouter>
            <p>comeing</p>
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
        element: <p>All Articles</p>,
      },
      {
        path: "addPublisher",
        element: <p>Add Publisher</p>,
      },
    ],
  },
]);

export default router;
