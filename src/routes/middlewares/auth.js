import React from "react";
import { Redirect } from "react-router-dom";
import store from "../../store/index";

const isUserLogin = (component) => {
  const mainStore = store.getState().auth;

  if (!mainStore.isUserLoggedIn) {
    return {
      status: false,
      routeObject: <Redirect to="/auth/login" />,
    };
  }

  return {
    status: true,
    routeObject: component,
  };
};

const isUserLogout = (component) => {
  const mainStore = store.getState().auth;

  if (mainStore.isUserLoggedIn) {
    return {
      status: false,
      routeObject: <Redirect to="/" />,
    };
  }

  return {
    status: true,
    routeObject: component,
  };
};

export default {
  isUserLogin,
  isUserLogout,
};
