import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../components/_layout/_layout";
import Control from "../pages/control";
import Contact from "../pages/contact";
import Login from "../pages/login";
import PrivateRoute from "../components/private-route";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "home",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "control",
        element: (
          <PrivateRoute>
            <Control />
          </PrivateRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;