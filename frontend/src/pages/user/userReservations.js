import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";

import UserSideNav from "../../components/userSideNav";
import {
  getUserReservations,
  deleteReservation,
} from "../../functions/reservation";
import balckBg1 from "../../images/block-bg-1.png";
import balckBg2 from "../../images/block-bg-2.png";

function UserReservations(props) {
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const { user } = props;

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const res = await getUserReservations(user.token, user._id);
      console.log(res.data.data);
      setReservations(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleDelete = async (r) => {
    if (
      window.confirm(`Do you really want to remove ${r.name} reservation? `)
    ) {
      try {
        setLoading(true);
        await deleteReservation(user.token, r._id);
        toast.success(`${r.name} deleted successfully.`);
        loadReservations();
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <UserSideNav />
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div
          className="d-flex flex-column align-items-center login-container"
          style={{ gap: "15px" }}
        >
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
            <h4 className="text-center m-0">Reservations</h4>
            <hr />
          </div>
          <div className="row p-2" style={{ width: "75%", height: "80%" }}>
            {reservations.length > 0 &&
              reservations.map((r) => {
                return (
                  <div className=" col-sm-3" key={r._id}>
                    <div
                      className="border p-3"
                      style={{ boxShadow: "0px 3px 6px rgba(0,0,0,0.3)" }}
                    >
                      <p>Name: {r.name}</p>
                      <p>Seats: {r.seats}</p>
                      <p>
                        Time: {new Date(r.reservationDateTime).toLocaleString()}
                      </p>
                      <p>Status: {r.status}</p>
                      <hr />
                      <button
                        className="btn btn-raised btn-danger mt-3"
                        onClick={(e) => handleDelete(r)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(UserReservations);
