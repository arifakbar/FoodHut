import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import history from "../history";
import { logoutUser } from "../actions/index";

function Nav(props) {
  const { user } = props;

  const handleLogout = async () => {
    try {
      await props.logoutUser();
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ position: "sticky" }}>
      <div
        className="container-fluid"
        style={{ background: "transparent", zIndex: 2 }}
      >
        <Link to="/" className=".navbar-brand text-white m-0 h5">
          FOOD HUT
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNavAltMarkup"
          style={{ width: "80%" }}
        >
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/">
              Menu
            </Link>
            <Link className="nav-link" to="/">
              About
            </Link>
            <Link className="nav-link" to="/">
              Contact
            </Link>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link text-reset me-3" to="/">
              <i className="fas fa-shopping-cart text-dark"></i>
              <span
                className="
                  badge
                  rounded-pill
                  badge-notification
                  bg-white
                  text-danger
                "
              >
                0
              </span>
            </Link>
            {user && user.token ? (
              <>
                <a
                  className="
                dropdown-toggle
                d-flex
                align-items-center
                hidden-arrow
                me-3
              "
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                    className="rounded-circle"
                    height="25"
                    alt=""
                    loading="lazy"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    {user && user.token && user.role === "subscriber" && (
                      <Link className="dropdown-item" to="/user/profile">
                        My profile
                      </Link>
                    )}
                    {user && user.token && user.role === "admin" && (
                      <Link className="dropdown-item" to="/admin/dashboard">
                        Dashboard
                      </Link>
                    )}
                  </li>
                  <li>
                    <button onClick={handleLogout} className="dropdown-item">
                      Logout
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <Link className="nav-link active" to="/signup">
                  Register
                </Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { logoutUser: logoutUser })(Nav);
