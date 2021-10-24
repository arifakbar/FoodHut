import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";

import AdminSideNav from "../../components/adminSideNav";
import {
  getAllReservations,
  updateReservationStatus,
  deleteReservation,
} from "../../functions/reservation";

function AdminReservations(props) {
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const { user } = props;

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const res = await getAllReservations(user.token);
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

  const updateStatus = async (e, r) => {
    try {
      setLoading(true);
      const res = await updateReservationStatus(
        user.token,
        r._id,
        e.target.value
      );
      toast.success(`${res.data.data.name} status updated successfully`);
      loadReservations();
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className>
      <AdminSideNav />
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div
          className="d-flex flex-column align-items-center"
          style={{ gap: "15px" }}
        >
          <h2 className="my-2">Reservations</h2>
          <div className="row p-2" style={{ width: "80%" }}>
            {reservations.length > 0 &&
              reservations.map((r) => {
                return (
                  <div className=" col-sm-3" key={r._id}>
                    <div className="border p-2">
                      <p>Name: {r.name}</p>
                      <p>Seats: {r.seats}</p>
                      <p>
                        Time: {new Date(r.reservationDateTime).toLocaleString()}
                        {/* {r.reservationDateTime} */}
                      </p>
                      <label>Status: </label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          updateStatus(e, r);
                        }}
                      >
                        <option
                          value="Confirmed"
                          selected={r.status === "Confirmed"}
                        >
                          Confirmed
                        </option>
                        <option
                          value="Cancelled"
                          selected={r.status === "Cancelled"}
                        >
                          Cancelled
                        </option>
                        <option
                          value="Processing"
                          selected={r.status === "Processing"}
                        >
                          Processing
                        </option>
                      </select>
                      <button
                        className="btn btn-raised btn-danger mt-3"
                        onClick={(e) => handleDelete(r)}
                      >
                        Delete
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

export default connect(mapStateToProps)(AdminReservations);
