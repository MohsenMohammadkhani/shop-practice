import React from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "../partials/aside/Sidebar";
import Nav from "../partials/nav/Nav";
import routes from "../../routes/routes";

export default function Dashboard() {
  return (
    <>
      <Nav />
      <Sidebar />
      <Switch>
        {routes.map((route, item) => (
          <Route
            key={item}
            render={route.render}
            path={route.path}
            exact={route.exact}
          />
        ))}
      </Switch>
    </>
  );
}
