import React, { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Spin } from "antd";

// import { DatePicker, TimePicker } from "antd";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar } from "react-modern-calendar-datepicker";
import balckBg1 from "../images/block-bg-1.png";
import balckBg2 from "../images/block-bg-2.png";
import Footer from "../components/footer";

import { bookReservation } from "../functions/reservation";

function Reservation(props) {
  // const [selectedDay, setSelectedDay] = useState(null);
  const { user } = props;
  const [loading, setLoading] = useState(false);
  const [reservationDateTime, setReservationDateTime] = useState(Date.now());
  const [name, setName] = useState("");
  const [seats, setSeats] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (new Date(reservationDateTime) < new Date()) {
        return toast.error("Reservation date can't be of past.");
      }
      setLoading(true);
      const res = await bookReservation(user.token, {
        name,
        reservationDateTime,
        seats,
        reservedBy: user._id,
      });
      setName("");
      setReservationDateTime("");
      setSeats(1);
      console.log(res.data.data);
      toast.success("Reservation done successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ height: "97vh" }}>
        <div className="reservation-banner"></div>
      </div>
      <div className="container-fluid position-relative reservation-container">
        <img
          src={balckBg1}
          alt="NF"
          style={{ position: "absolute", top: "-6.5%", right: "0" }}
        />
        <img
          src={balckBg2}
          alt="NF"
          style={{ position: "absolute", top: "30%", left: "0" }}
        />
        <div className="reservation-heading">
          <hr />
          <h3 className="m-0">RESERVATION</h3>
          <hr />
        </div>
        <div className="reservation-description">
          <small>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, <br />{" "}
            <br /> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,\{" "}
            <br /> <br />
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet \
          </small>
        </div>
        {loading ? (
          <div className="position-relative">
            <div className="center-spinner">
              <Spin size="large" />
            </div>
          </div>
        ) : (
          <form className="reservation-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name: </label>
              <input
                type="text"
                minLength={2}
                maxLength={32}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name For Reservation"
              />
            </div>
            <div className="mb-3">
              <label>Date</label>
              {/* <DatePicker
          onChange={(date, dateString) =>
            console.log(date + " " + dateString)
          }
          style={{ width: "100%" }}
        />
        <TimePicker
          onChange={(time, timeString) =>
            console.log(time + " " + timeString)
          }
          style={{ width: "100%" }}
        /> */}
              <input
                type="datetime-local"
                value={reservationDateTime}
                onChange={(e) => {
                  setReservationDateTime(e.target.value);
                }}
                required
              />
              {/* <Calendar
          value={selectedDay}
          onChange={setSelectedDay}
          shouldHighlightWeekends
        /> */}
            </div>
            <div className="mb-3 position-relative">
              <label>Guests</label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-people"
                viewBox="0 0 16 16"
                className="peoples-svg"
              >
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              </svg>
              <input
                type="number"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              />
            </div>
            <button className="menu-button">SUBMIT</button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Reservation);
