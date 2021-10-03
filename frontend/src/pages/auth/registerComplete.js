import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase";
import history from "../../history";
import { createOrUpdateUser } from "../../functions/auth";
import { loggedInUser } from "../../actions/index";

function RegisterComplete(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        toast.success("Registered successfully.");
        history.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="container">
      <form
        className="border p-5 auth-form"
        style={{ width: "80%" }}
        onSubmit={handleSubmit}
      >
        <h4 className="text-center mb-3">COMPLETE REGISTRATION</h4>
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

export default connect(null, { loggedInUser: loggedInUser })(RegisterComplete);
