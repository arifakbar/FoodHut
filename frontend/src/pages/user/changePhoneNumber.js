import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import { toast } from "react-toastify";

import history from "../../history";
import { sendOTP, verifyOTP } from "../../functions/auth";

function ChangePhoneNumber(props) {
  const { user } = props;
  const [number, setNumber] = useState(user.phoneNumber);
  const [loading, setLoading] = useState(false);
  const [disableOTP, setDisableOTP] = useState(true);
  const [otp, setOTP] = useState(0);

  const handleNumberSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sendOTP(user.token, number);
      console.log(res.data.data);
      setLoading(false);
      setDisableOTP(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await verifyOTP(user.token, number, otp);
      console.log(res.data.data);
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
        <div
          className="border p-5 auth-form"
          style={{ width: "80%" }}
          onSubmit={handleNumberSubmit}
        >
          <h4 className="text-center mb-5">Change Phone Number</h4>
          <form className="d-flex justify-content-between align-items-center">
            <input
              type="number"
              className="form-control"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
            <button
              className="btn btn-raised text-white"
              style={{
                background: "#f16121",
                marginLeft: "15px",
              }}
            >
              Verify
            </button>
          </form>
          <br />
          <form>
            <label>Enter OTP :</label>
            <input
              type="number"
              className="form-control"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
              disabled={disableOTP}
            />
            <button
              onClick={handleOTPSubmit}
              className="btn btn-raised text-white mt-3"
              style={{ background: "#f16121" }}
              disabled={disableOTP}
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(ChangePhoneNumber);
