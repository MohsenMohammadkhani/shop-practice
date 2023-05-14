import React from "react";
import { Link } from "react-router-dom";
import Welcome from "../component/section/Welcome";
import authRoutes from "./auth";
import middleware from "./middlewares";

const routes = [
  {
    path: "/",
    render: () => {
      return middleware(
        ["isUserLogin"],
        <Welcome />,
        "Welcome"
      );
    },
    exact: true,
  },
  ...authRoutes,
  {
    path: "*",
    render: () => {
      return <p className="text-center">404 error</p>;
    },
    exact: true,
  },
];

export default routes;
