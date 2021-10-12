import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import UserSideNav from "../../components/userSideNav";

function UserProfile(props) {
  const { user } = props;
  const [image, setImage] = useState("");
  return (
    <>
      <UserSideNav />
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
              src="https://mdbootstrap.com/img/new/avatars/2.jpg"
              alt="NF"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>
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
            <b>Phone Number :</b> {user.phoneNumber} &nbsp;
            <Link to="/user/changeNumber">Change Number</Link>
          </p>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(UserProfile);
