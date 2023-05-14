import React from "react";
import user from "./auth";

const allMiddlewares = {
  isUserLogin: (component) => user.isUserLogin(component),
  isUserLogout: (component) => user.isUserLogout(component),
  //   hasToken: (component) => auth.hasToken(component),
  //   checkUserPermissions: (component, componentName) =>
  //     auth.checkUserPermissions(component, componentName),
};

const middleware = (middlewares = [], component, componentName) => {
  let result = null;
  try {
    for (let i = 0; i < middlewares.length; i++) {
      result = allMiddlewares[middlewares[i]](component, componentName);
      if (result.status === false) {
        break;
      }
    }
    return result.routeObject;
  } catch (e) {
    return result.routeObject;
  }
};

export default middleware;
