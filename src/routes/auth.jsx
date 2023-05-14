import React from "react";
import Login from "../component/section/auth/Login";
import Register from "../component/section/auth/Register";

const authRoutes = [
  {
    path: "/auth/login",
    render: () => <Login />,
    exact: true,
  },
  {
    path: "/auth/register",
    render: () => <Register />,
    exact: true,
  },
];

export default authRoutes;
