import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Spin } from "antd";

import { auth } from "../../firebase/firebase";
import history from "../../history";

function ForgetPassword(props) {
  const { user } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    try {
      setLoading(true);
      await auth.sendPasswordResetEmail(email, config);
      setEmail("");
      toast.success(`Check ${email} for password reset link.`);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <form
          className="border p-5 auth-form"
          style={{ width: "80%" }}
          onSubmit={handleSubmit}
        >
          <h4 className="text-center mb-3">FORGOT PASSWORD</h4>
          <div className="mb-3">
            <label className="form-label">Email Address : </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter registered email address"
            />
          </div>
          <button
            className="btn btn-raised text-white btn-block"
            style={{ background: "#f16121" }}
          >
            SEND EMAIL
          </button>
        </form>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(ForgetPassword);
