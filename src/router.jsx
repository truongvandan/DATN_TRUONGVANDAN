import React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthController from "./components/AuthController";
import TestPrivate from "./pages/Test";

const router = createBrowserRouter([
  {
    element: (
      <AuthController />
    ),
    children: [
      {
        path: "/test",
        element: (
          <TestPrivate />
        )
      }
    ]
  },
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    path: "/login",
    element: (
      <Login />
    ),
  },
  {
    path: "/register",
    element: (
      <Register />
    ),
  },
  {
    path: "/vaccines",
    element: (
      <Home />
    ),
  },
]);

export { router }
