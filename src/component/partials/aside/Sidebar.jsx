import React from "react";
import { withRouter, Link } from "react-router-dom";

const listRouteComponentToHide = ["/auth/login", "/auth/register"];

const ComponentToHide = (props) => {
  const { location } = props;

  if (listRouteComponentToHide.includes(location.pathname)) {
    return null;
  }

  return <Sidebar />;
};

function Sidebar() {
  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4 sidebar-dark-info"
      style={{ minHeight: "762px" }}
    >
      <div className="sidebar">
        <div>
          <div className="user-panel mt-3 pb-3 mb-3 d-flex text-white">
            داشبورد فروشگاه محسن
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column p-0"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fa fa-dashboard"></i>
                  <p>پنل کاربری</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}

const ComponentThatHides = withRouter(ComponentToHide);
export default ComponentThatHides;
