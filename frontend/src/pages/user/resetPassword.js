import React, { useState } from "react";
import { toast } from "react-toastify";

import { auth } from "../../firebase/firebase";
import UserSideNav from "../../components/userSideNav";

function ResetPassword(props) {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!password) {
        toast.error("Password is required!");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be atleast 6 characters long!"); //firebase default
        return;
      }
      await auth.currentUser.updatePassword(password);
      toast.success("Password updated successfully.");
    } catch (err) {
      console.log(err);
      toast.err(err.message);
      setPassword("");
    }
  };

  return (
    <div className="container">
      <UserSideNav />
      <form
        className="border p-5 auth-form"
        style={{ width: "80%" }}
        onSubmit={handleSubmit}
      >
        <h4 className="text-center mb-3">CHANGE PASSWORD</h4>
        <div className="mb-3">
          <label className="form-label">New Password : </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter new password"
          />
        </div>
        <button
          className="btn btn-raised text-white btn-block"
          style={{ background: "#f16121" }}
        >
          CHANGE
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
