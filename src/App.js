import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./route/routes";

function App() {
  return (
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
  );
}

export default App;
