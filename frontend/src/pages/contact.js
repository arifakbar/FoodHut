import React from "react";
import Footer from "../components/footer";
import balckBg1 from "../images/block-bg-1.png";
import balckBg2 from "../images/block-bg-2.png";

function Contact() {
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
      </div>
      <Footer />
    </>
  );
}

export default Contact;
