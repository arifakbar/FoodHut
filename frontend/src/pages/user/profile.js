import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import UserSideNav from "../../components/userSideNav";
import balckBg1 from "../../images/block-bg-1.png";
import balckBg2 from "../../images/block-bg-2.png";

function UserProfile(props) {
  const { user } = props;
  return (
    <>
      <UserSideNav />
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
          <h4 className="text-center m-0">ACCOUNT</h4>
          <hr />
        </div>
        <div className="account-container">
          <div className="my-3">
            Email Address:
            <br />
            <input type="text" disabled value={user.email} />
          </div>
          <div className="my-3">
            Username :
            <br />
            <div className="d-flex gap-4">
              <input type="text" disabled value={user.name} />

              <Link to="/user/changeName" className="account-container-button">
                <button className="btn btn-raised text-center">
                  Change Username
                </button>
              </Link>
            </div>
          </div>
          <div className="my-3">
            Phone Number :
            <br />
            <div className="d-flex gap-4">
              <input
                type="text"
                disabled
                value={
                  user.phoneNumber === 0
                    ? "Not Entered Phone Number Yet!"
                    : user.phoneNumber
                }
              />
              <Link
                to="/user/changeNumber"
                className="account-container-button"
              >
                <button className="btn btn-raised">Change Number</button>
              </Link>
            </div>
          </div>
          <div className="my-3">
            Address :
            <br />
            <div className="d-flex gap-4">
              <textarea disabled>
                {user.address.length === 0
                  ? "Not Entered Address Yet!"
                  : user.address}
              </textarea>
              <Link
                to="/user/address"
                className="account-container-button account-address-btn"
              >
                <button className="btn btn-raised ">Change Address</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(UserProfile);
