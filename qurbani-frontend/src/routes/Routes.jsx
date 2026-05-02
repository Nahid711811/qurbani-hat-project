import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import AllAnimals from "../pages/AllAnimals";

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
        path:"/all_animals",
        element:<AllAnimals />
      }
    ],
  },
]);

export default router;