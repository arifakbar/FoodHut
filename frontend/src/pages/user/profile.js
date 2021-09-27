import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function UserProfile(props) {
  const { user } = props;
  return (
    <div className="container py-4">
      <h4 className="text-center">Profile</h4>
      <div
        className="d-flex flex-column align-items-center my-5"
        style={{ gap: "15px" }}
      >
        <div
          className="profile-image bg-dark d-flex flex-column align-items-center"
          style={{
            width: "250px",
            height: "250px",
            overflow: "hidden",
            borderRadius: "50%",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
            alt="NF"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>
        <label className="changePP">
          <input type="file" />
          Change Pic
        </label>
        <p>
          <b>Email Address: </b>
          {user.email}
        </p>
        <p>
          <b>Username : </b>
          {user.name} &nbsp;
          <Link to="/user/changeName">Change Username</Link>
        </p>
        <p>
          <b>Phone Number :</b> Enter your phone number &nbsp;
          <Link to="/user/changeNumber">Change Number</Link>
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(UserProfile);
