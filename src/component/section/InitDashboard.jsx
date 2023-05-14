import React, { useEffect } from "react";
import { connect } from "react-redux";
import SplashLoginPage from "../partials/other/SplashLoginPage";
import Dashboard from "../sections/Dashboard";
import authActions from "../../store/actions/authActions";

function InitDashboard({ isInit, isUserLoggedIn, initApp }) {
  useEffect(() => {
    initApp();
  }, []);

  return isInit ? <Dashboard /> : <SplashLoginPage />;
}

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.auth.isUserLoggedIn,
    isInit: state.auth.isInit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initApp: function () {
      dispatch({
        type: authActions.CHECK_USER_LOGIN,
        payload: null,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitDashboard);
