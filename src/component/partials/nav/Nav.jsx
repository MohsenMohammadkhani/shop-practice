import React from "react";
import { withRouter } from "react-router-dom";

const listRouteComponentToHide = [
  "/auth/login",
  "/auth/register",
];

const ComponentToHide = (props) => {
  const { location } = props;

  if (listRouteComponentToHide.includes(location.pathname)) {
    return null;
  }

  return <Nav />;
};

function Nav() {
  return (
    <nav className="main-header navbar navbar-expand bg-white navbar-light border-bottom navbar-dark bg-success">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#">
            <i className="fa fa-bars"></i>
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="index3.html" className="nav-link">
            خانه
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link">
            تماس
          </a>
        </li>
      </ul>

      <ul className="navbar-nav mr-auto">
        <li className="nav-item logout-button d-flex align-items-center justify-content-center hover">
          <i className="fa fa-power-off" aria-hidden="true"></i>
        </li>
      </ul>
    </nav>
  );
}

const ComponentThatHides = withRouter(ComponentToHide);
export default ComponentThatHides;
