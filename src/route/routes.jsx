import React from "react";
import { Link } from "react-router-dom";
import authRoutes from "./auth";

const routes = [
  {
    path: "/",
    render: () => {
      return (
        <div className="text-center">
          <Link to={"/auth/login"}>ورود</Link>
        </div>
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
