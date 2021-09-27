import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { updateUsername, currentUser } from "../../functions/auth";
import { currentUserInfo } from "../../actions/index";
import history from "../../history";

function ChangeName(props) {
  const { user } = props;
  const [username, setUsername] = useState(user.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUsername(username, user.token);
      const res = await currentUser(user.token);
      props.currentUserInfo(user, res);
      toast.success("Username changed successfully.");
      history.push("/user/profile");
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
        <h4 className="text-center mb-3">CHANGE USERNAME</h4>
        <div className="mb-3">
          <label className="form-label">Username : </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { currentUserInfo: currentUserInfo })(
  ChangeName
);
