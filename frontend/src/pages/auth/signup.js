import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase";
import history from "../../history";
import balckBg1 from "../../images/block-bg-1.png";
import balckBg2 from "../../images/block-bg-2.png";

function Signup(props) {
  const { user } = props;

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await auth.sendSignInLinkToEmail(email, config);
      toast.success(
        `Mail sent to the ${email}. Click the link in mail to complete to complete the registration.`
      );

      if (typeof window !== undefined) {
        window.localStorage.setItem("emailForRegistration", email);
      }

      setEmail("");
    } catch (err) {
      console.log(err);
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
        <hr />
        <h3 className="m-0">REGISTER</h3>
        <hr />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email Address : </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter a valid email address"
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
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Signup);
