import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase";
import history from "../../history";

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
    <div className="container">
      <form
        className="border p-5 auth-form"
        style={{ width: "80%" }}
        onSubmit={handleSubmit}
      >
        <h4 className="text-center mb-3">REGISTER</h4>
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
        <button
          className="btn btn-raised text-white btn-block"
          style={{ background: "#f16121" }}
        >
          REGISTER
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Signup);
