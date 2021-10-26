import React from "react";

import balckBg1 from "../images/block-bg-1.png";
import balckBg2 from "../images/block-bg-2.png";
import image from "../images/menu-ff-pizza.jpg";
import Footer from "../components/footer";

function Press() {
  return (
    <div>
      <div style={{ height: "97vh" }}>
        <div className="press-banner"></div>
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
          <h3 className="m-0">NEWS</h3>
          <hr />
        </div>
      </div>
      <div className="press-container">
        <div className="press-img">
          <img src={image} alt="NF" />
        </div>
        <div className="press-info">
          <div className="press-news">
            <p>Posted on Nov 20, 2021</p>
            <h3>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo
            </p>
            <a href="">Read More</a>
          </div>
          <div className="press-news">
            <p>Posted on Nov 20, 2021</p>
            <h3>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo
            </p>
            <a href="">Read More</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Press;
