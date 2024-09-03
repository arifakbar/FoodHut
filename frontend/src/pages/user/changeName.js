import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { updateUsername, currentUser } from "../../functions/auth";
import { currentUserInfo } from "../../actions/index";
import history from "../../history";
import balckBg1 from "../../images/block-bg-1.png";
import balckBg2 from "../../images/block-bg-2.png";

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
        <h4 className="text-center m-0">USERNAME</h4>
        <hr />
      </div>
      <form onSubmit={handleSubmit}>
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
        <div
          style={{ width: "100%" }}
          className="d-flex flex-column align-items-center"
        >
          <button className="login-btn">UPDATE</button>
        </div>
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
