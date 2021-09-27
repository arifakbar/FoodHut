import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import history from "../../history";
import { loggedInUser } from "../../actions/index";
import { auth, googleAuthProvider } from "../../firebase/firebase";
import { createOrUpdateUser } from "../../functions/auth";

function Login(props) {
  let user = null;
  if (props.user) {
    user = props.user;
  }
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const [email, setEmail] = useState("0126CS181030@oriental.ac.in");
  const [password, setPassword] = useState("newpassword");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      const res = await createOrUpdateUser(idTokenResult.token);
      props.loggedInUser(idTokenResult, res);
      toast.success("Logged in successfully.");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      const res = await createOrUpdateUser(idTokenResult.token);
      props.loggedInUser(idTokenResult, res);
      toast.success("Logged in successfully.");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleFacebookLogin = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="container">
      <form className="border p-5 auth-form" style={{ width: "80%" }}>
        <h4 className="text-center mb-3">LOGIN</h4>
        <div className="mb-3">
          <label className="form-label">Email Address : </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label">Password : </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3" style={{ fontSize: "12px" }}>
          Forgot Password ?<Link to="/forget/password"> Click here.</Link>
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-raised btn-block text-white mb-3"
          style={{ background: "#f16121" }}
        >
          Login With Email And Password
        </button>
        <button
          onClick={handleGoogleLogin}
          className="btn btn-raised btn-block text-white mb-3"
          style={{ background: "#4285F4" }}
        >
          Login With Google
        </button>
        <button
          onClick={handleFacebookLogin}
          className="btn btn-raised btn-block text-white"
          style={{ background: "black" }}
        >
          Login With Facebook
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { loggedInUser: loggedInUser })(Login);
