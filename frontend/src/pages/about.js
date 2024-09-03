import React from "react";

import aboutHistory from "../images/about-history.jpg";
import Chef1 from "../images/chef1.jpg";
import Chef2 from "../images/chef2.jpg";
import Chef3 from "../images/chef3.jpg";
import balckBg1 from "../images/block-bg-1.png";
import balckBg3 from "../images/block-bg-3.png";
import Footer from "../components/footer";

function About() {
  return (
    <>
      <div className="container-fluid d-flex flex-column align-items-center">
        <div style={{ height: "97vh" }}>
          <div className="about-banner"></div>
        </div>
        <img
          src={balckBg1}
          alt="NF"
          style={{
            position: "absolute",
            top: "100%",
            right: "0%",
          }}
        />
        <img
          src={balckBg3}
          alt="NF"
          style={{
            position: "absolute",
            top: "280%",
            left: "0%",
            transform: "rotate(180deg)",
          }}
        />
        <div className="about-history">
          <div className="history-heading">
            <h2>History</h2>
            <h4>Philosophy</h4>
          </div>
          <div className="history-content">
            <h6>Lorem ipsum dolor sit amet, consetetur</h6>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem Lorem
              ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
              eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
              sed diam voluptua. At vero eos et accusam et justo duo dolores et
              ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
            </p>
          </div>
          <div className="history-img">
            <img src={aboutHistory} alt="NF" />
          </div>
        </div>

        <div
          style={{
            height: "80vh",
            marginBottom: "15vh",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            id="carouselBasicExample"
            className="carousel slide carousel-fade"
            data-mdb-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-mdb-target="#carouselBasicExample"
                data-mdb-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-mdb-target="#carouselBasicExample"
                data-mdb-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-mdb-target="#carouselBasicExample"
                data-mdb-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <i className="fas fa-quote-left"></i>
                  <p>
                    The world’s a big, big stage for this notorious deli smack
                    in the middle of the theatre district, infamously famous for
                    its over-the-top corned beef and pastrami sandwiches,
                    chopped liver, blintzes, celebrities, salami, smoked fish
                    and New York’s finest cheesecake.
                  </p>
                </div>
              </div>

              <div className="carousel-item">
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <i className="fas fa-quote-left"></i>
                  <p>
                    You might not find dragon meat on the menu, but you’ll find
                    pretty much anything else that walks, swims or flies, cooked
                    up in more ways than there are people in the Guangdong
                    province. This Midtown mainstay has a 20-year history of
                    delivering mouth-watering and Cantonese style chow.
                  </p>
                </div>
              </div>

              <div className="carousel-item">
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
                  class="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <i className="fas fa-quote-left"></i>
                  <p>
                    This NYC historical landmark in the heart of the Theatre
                    District has been serving up suds and down home pub food
                    since 1892, surviving prohibition by renting the front of
                    its then Rockefeller Center façade to Greek florists, while
                    the Hurley brothers ran a speak-easy in back.
                  </p>
                </div>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="about-team">
          <h1>Our Team</h1>
          <h4>The Hardworking Team behind the restaurant</h4>
          <div className="team-img">
            <div className="team-member">
              <div className="member-pic">
                <img src={Chef1} alt="NF" />
              </div>
              <div className="member-info">
                <p>
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                  consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                  invidunt ut labore et dolore magna aliquyam erat, sed diam
                  voluptua. At vero eos et accusam et justo duo dolores et ea
                  rebum.
                </p>
              </div>
            </div>

            <div className="team-member">
              <div className="member-pic">
                <img src={Chef3} alt="NF" />
              </div>
              <div className="member-info">
                <p>
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                  consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                  invidunt ut labore et dolore magna aliquyam erat, sed diam
                  voluptua. At vero eos et accusam et justo duo dolores et ea
                  rebum.
                </p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-pic">
                <img src={Chef2} alt="NF" />
              </div>
              <div className="member-info">
                <p>
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                  consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                  invidunt ut labore et dolore magna aliquyam erat, sed diam
                  voluptua. At vero eos et accusam et justo duo dolores et ea
                  rebum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
