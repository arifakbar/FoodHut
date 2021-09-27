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
    <nav className="d-flex justify-content-between p-4">
      <Link to="/">Food Hut</Link>
      <div className="d-flex gap-3">
        <Link to="/">Home</Link>
        <Link to="/">Menu</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
      </div>
      <div className="d-flex gap-3">
        {user && user.token ? (
          <button
            onClick={handleLogout}
            className="border-0 text-white"
            style={{
              background: "inherit",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            LOGOUT ( {user.name ? user.name : user.email} )
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { logoutUser: logoutUser })(Nav);
