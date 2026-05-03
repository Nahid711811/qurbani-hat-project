import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllAnimals from "../pages/AllAnimals";
import MyProfile from "../pages/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import PrivateRoute from "./PrivateRoute";
import AnimalDetails from "../pages/AnimalDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login_user",
        element: <Login />,
      },
      {
        path: "/register_user",
        element: <Register />,
      },
      {
        path: "/all_animals",
        element: <AllAnimals />,
      },
      {
        path: "/my_profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/update_profile",
        element: <UpdateProfile />,
      },
      {
        path: "/animal/:id",
        element: (
          <PrivateRoute>
            <AnimalDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
