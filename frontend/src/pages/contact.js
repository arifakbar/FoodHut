import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";

import { createContact } from "../functions/contact";
import Footer from "../components/footer";
import balckBg1 from "../images/block-bg-1.png";
import balckBg2 from "../images/block-bg-2.png";

function Contact(props) {
  const { user } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createContact(
        user.token,
        name,
        email,
        subject,
        message
      );
      toast.success("Message sent successfully.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
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
        <div className="contact-banner"></div>
      </div>
      <div className="container-fluid position-relative reservation-container">
        <img
          src={balckBg1}
          alt="NF"
          style={{ position: "absolute", top: "-21%", right: "0" }}
        />
        <img
          src={balckBg2}
          alt="NF"
          style={{ position: "absolute", top: "30%", left: "0" }}
        />
        <div className="reservation-heading">
          <hr />
          <h3 className="m-0">CONTACT</h3>
          <hr />
        </div>
        <div className="contact-container">
          <div className="contact-details">
            <div>
              <h4>Address</h4>
              <p>
                <i className="fas fa-map-marker-alt"></i> &nbsp; 28 Seventh
                Avenue, Neew York, 10014
              </p>
              <p>
                <i className="fas fa-phone-alt"></i> &nbsp; 000 123 4567
              </p>
              <p>
                <i className="far fa-envelope"></i> &nbsp; abcd123@gmail.com
              </p>
            </div>
            <div>
              <h4>Working Hours</h4>
              <p>9:00 AM to 9:00 PM in Weekdays</p>
              <p>1:00 PM to 8:00 PM in Weekends</p>
            </div>
            <div>
              <h4>Follow Us</h4>
              <div className="d-flex gap-3 align-items-center">
                <a href="">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                minLength={2}
                maxLength={30}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                placeholder="Message"
                required
                minLength={2}
                maxLength={110}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button>SEND MESSAGE</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Contact);
