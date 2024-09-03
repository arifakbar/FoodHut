import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import history from "../history";
import { logoutUser } from "../actions/index";
import logo from "../images/Logo.png";

function Nav(props) {
  const { user, cart } = props;

  const handleLogout = async () => {
    try {
      await props.logoutUser();
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const bars = document.querySelector("#bars");
    const menu = document.querySelector(".nav2");
    const html = document.querySelector("html");
    const profileLinks = document.querySelector(".profile-links");
    html.addEventListener("click", function (e) {
      if (e.target.id !== "bars" && e.target.id !== "profile-pic")
        menu.classList.remove("autoHeight");
      if (e.target.id !== "profile-pic" && e.target.id !== "profile-pic2") {
        profileLinks.style.display = "none";
      }
    });
    bars.addEventListener("click", () => {
      menu.classList.toggle("autoHeight");
    });
  }, []);

  const handleProfileLinks = () => {
    const profileLinks = document.querySelector(".profile-links");
    if (profileLinks.style.display === "flex") {
      profileLinks.style.display = "none";
    } else {
      profileLinks.style.display = "flex";
    }
  };

  return (
    <>
      <nav>
        <div>
          <Link to="/">HOME</Link>
          <Link to="/menu">MENU</Link>
          <Link to="/search">SHOP</Link>
          <Link to="/reservation">RESERVATION</Link>
        </div>
        <Link to="/">
          <label style={{ cursor: "pointer" }}>
            <img src={logo} alt="NF" />
          </label>
        </Link>
        <div>
          <Link to="/press">PRESS</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/cart" style={{ marginRight: "10px" }}>
            <i className="fas fa-shopping-cart text-dark"></i>
            <span
              className="
                  badge
                  rounded-pill
                  badge-notification
                  bg-danger
                  text-white
                  
                "
            >
              {cart && cart.length}
            </span>
          </Link>
          {user && user.token ? (
            <div
              className="profile-pic"
              style={{ cursor: "pointer" }}
              onClick={handleProfileLinks}
            >
              <img
                className="profile-pic"
                id="profile-pic2"
                alt="NF"
                src="https://images.unsplash.com/photo-1635978792499-1065ae7e1f05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
              />
            </div>
          ) : (
            <>
              <Link to="/signup">REGISTER</Link>
              <Link to="/login">LOGIN</Link>
            </>
          )}
        </div>
        <div className="profile-links">
          {user && user.token && user.role === "subscriber" && (
            <Link to="/user/profile" className="link-link">
              MY PROFILE
            </Link>
          )}
          {user && user.token && user.role === "admin" && (
            <Link to="/admin/dashboard" className="link-link">
              DASHBOARD
            </Link>
          )}
          <Link to="/" className="link-link" onClick={handleLogout}>
            LOGOUT
          </Link>
        </div>
        <button className="bars" id="bars">
          <i className="fas fa-bars" id="bars"></i>
        </button>
      </nav>
      <div className="nav2">
        <Link to="/">HOME</Link>
        <Link to="/menu">MENU</Link>
        <Link to="/search">SHOP</Link>
        <Link to="/reservation">RESERVATION</Link>
        <Link to="/press">PRESS</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <div>
          <Link to="/cart">
            <i className="fas fa-shopping-cart text-dark"></i>
            <span
              className="
                  badge
                  rounded-pill
                  badge-notification
                  bg-danger
                  text-white
                "
            >
              {cart && cart.length}
            </span>
          </Link>
          {user && user.token ? (
            <>
              <div className="profile-pic" onClick={handleProfileLinks}>
                <img
                  alt="NF"
                  src="https://images.unsplash.com/photo-1635978792499-1065ae7e1f05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                  id="profile-pic"
                />
              </div>
              <div className="profile-links">
                {user && user.token && user.role === "subscriber" && (
                  <Link to="/user/profile" className="link-link">
                    MY PROFILE
                  </Link>
                )}
                {user && user.token && user.role === "admin" && (
                  <Link to="/admin/dashboard" className="link-link">
                    DASHBOARD
                  </Link>
                )}
                <Link to="/" className="link-link" onClick={handleLogout}>
                  LOGOUT
                </Link>
              </div>
            </>
          ) : (
            <div className="link-login">
              <Link to="/signup">REGISTER</Link>
              <Link to="/login">LOGIN</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user, cart: state.cart };
};

export default connect(mapStateToProps, { logoutUser: logoutUser })(Nav);

{
  /* <nav className="navbar navbar-expand-lg" style={{ position: "sticky" }}>
        <div
          className="container-fluid"
          style={{ background: "transparent", zIndex: 2 }}
        >
          <Link to="/" className=".navbar-brand">
            <img
              src={logo}
              alt="FH"
              style={{ height: "50px", width: "50px" }}
            />
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
              <Link className="nav-link" to="/menu">
                Menu
              </Link>
              <Link className="nav-link" to="/reservation">
                Reservation
              </Link>
              <Link className="nav-link" to="/search">
                Shop
              </Link>
              <Link className="nav-link" to="/about">
                About
              </Link>
              <Link className="nav-link" to="/press">
                Press
              </Link>
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link text-reset me-3" to="/cart">
                <i className="fas fa-shopping-cart text-dark"></i>
                <span
                  className="
                  badge
                  rounded-pill
                  badge-notification
                  bg-danger
                  text-white
                "
                >
                  {cart && cart.length}
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
                  </Link>
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
      </nav> */
}
