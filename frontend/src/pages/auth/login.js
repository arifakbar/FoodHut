import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Spin } from "antd";

import history from "../../history";
import { loggedInUser } from "../../actions/index";
import { auth, googleAuthProvider } from "../../firebase/firebase";
import { createOrUpdateUser, roleBasedRedirect } from "../../functions/auth";
import balckBg1 from "../../images/block-bg-1.png";
import balckBg2 from "../../images/block-bg-2.png";

function Login(props) {
  const [loading, setLoading] = useState(false);
  let user = null;
  if (props.user) {
    user = props.user;
  }
  useEffect(() => {
    if (history.location.state) return;
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 0126CS181030@oriental.ac.in - newpassword

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      const res = await createOrUpdateUser(idTokenResult.token);
      await props.loggedInUser(idTokenResult, res);
      setLoading(false);
      toast.success("Logged in successfully.");
      roleBasedRedirect(res);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      const res = await createOrUpdateUser(idTokenResult.token);
      await props.loggedInUser(idTokenResult, res);
      setLoading(false);
      toast.success("Logged in successfully.");
      roleBasedRedirect(res);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img
        src={balckBg1}
        alt="NF"
        style={{ position: "absolute", top: "0", right: "0" }}
      />
      <img
        src={balckBg2}
        alt="NF"
        style={{ position: "absolute", bottom: "0%", left: "0" }}
      />
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="login-heading">
            <hr />
            <h3 className="m-0">LOGIN</h3>
            <hr />
          </div>
          <form>
            <div className="mb-3">
              <label className="form-label">Email Address : </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password : </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-2" style={{ fontSize: "12px" }}>
              <Link to="/forget/password" style={{ color: "red" }}>
                Forgot Password ?
              </Link>
            </div>
            <div
              style={{ width: "100%" }}
              className="d-flex flex-column align-items-center"
            >
              <button
                onClick={handleSubmit}
                className="login-btn btn btn-raised"
              >
                LOGIN
              </button>
              <p>OR</p>
            </div>
            <div
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              <button
                onClick={handleGoogleLogin}
                className="btn btn-raised mb-3 py-3 "
                style={{ width: "60%" }}
              >
                <i className="fab fa-google fa-x"></i>&nbsp;&nbsp;GOOGLE LOGIN
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { loggedInUser: loggedInUser })(Login);
