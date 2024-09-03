import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Spin } from "antd";

import { auth } from "../../firebase/firebase";
import history from "../../history";
import { createOrUpdateUser } from "../../functions/auth";
import { loggedInUser } from "../../actions/index";
import balckBg1 from "../../images/block-bg-1.png";
import balckBg2 from "../../images/block-bg-2.png";

function RegisterComplete(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Password is required!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters long!"); //firebase default
      return;
    }
    setLoading(true);
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        const res = await createOrUpdateUser(idTokenResult.token);
        await props.loggedInUser(idTokenResult, res);
        setLoading(false);
        toast.success("Registered successfully.");
        history.push("/");
      }
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
      <div className="login-heading">
        <hr style={{ width: "25%" }} />
        <h3 className="m-0">COMPLETE REGISTRATION</h3>
        <hr style={{ width: "25%" }} />
      </div>
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address : </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password : </label>
            <input
              type="password"
              className="form-control"
              value={password}
              placeholder="Must be atleast 6 characters long"
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div
            style={{ width: "100%" }}
            className="d-flex flex-column align-items-center"
          >
            <button
              className="login-btn btn btn-raised"
              style={{ background: "#f16121" }}
            >
              COMPLETE
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default connect(null, { loggedInUser: loggedInUser })(RegisterComplete);
