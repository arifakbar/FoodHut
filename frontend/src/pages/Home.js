import React from "react";
import { Link } from "react-router-dom";

import aboutImg from "../images/Image 2.png";
import ourFood from "../images/our-food-bg-5.png";
import ourDrink from "../images/our-drink.png";
import diningImg from "../images/Image 3.png";
import MostRated from "../components/Home/MostRated";
import ForCoupon from "../images/ForCoupon.png";
import Footer from "../components/footer";

function Home() {
  return (
    <>
      <div className="container-fluid d-flex flex-column align-items-center">
        <div style={{ height: "97vh" }}>
          <div className="home-banner"></div>
        </div>
        <div className="home-about">
          <div className="home-about-content">
            <h1>About Food Hut</h1>
            <h5>Lorem ipsum dolor sit amet, consetetur</h5>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur
            </p>
            <Link to="/about">
              <button>ABOUT US</button>
            </Link>
          </div>
          <div className="home-about-image">
            <img src={aboutImg} alt="NF" />
          </div>
        </div>
        <div className="home-cuisine">
          <div className="home-cuisine-image">
            <img src={ourFood} alt="NF" />
          </div>
          <div className="home-cuisine-content">
            <h1>Cuisine</h1>
            <h4>Discover your taste</h4>
            <h5>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores
            </p>
            <Link to="/menu">
              <button>VIEW MENU</button>
            </Link>
          </div>
        </div>
        <MostRated type="full-course" />
        <div className="home-coupons">
          <h3>The Ultimate Gift</h3>
          <div className="coupon-container">
            <div className="coupon-img">
              <img src={ForCoupon} alt="NF" />
            </div>
            <div className="coupon-content">
              <h4>The Gift Coupons</h4>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum.
              </p>
              <button>Get Coupons</button>
            </div>
          </div>
        </div>
        <div className="home-drinks">
          <div className="home-drinks-content">
            <h1>Bistro</h1>
            <h3>Let your drinks find you</h3>
            <h4>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</h4>
            <h5>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt
            </p>
            <button>VIEW DRINKS</button>
          </div>
          <div className="home-drinks-image">
            <img src={ourDrink} alt="NF" />
          </div>
        </div>
        <MostRated type="drinks" />
        <div className="home-dining">
          <h1>Private Dining</h1>
          <h4>Enjoy your time</h4>
          <div className="home-dining-banner">
            <div className="home-dining-banner-image">
              <div>
                <img src={diningImg} alt="NF" />
              </div>
            </div>
            <div className="home-dining-banner-content">
              <h2>Private Dining Available</h2>
              <h5>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
              </p>
              <Link to="/reservation">
                <button>MAKE RESERVATION</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="home-casual-elegance">
          <p>Casual Elegance</p>
          <div>
            <h1>Delivering To You !</h1>
          </div>
        </div>
        <br />
      </div>
      <Footer />
    </>
  );
}

export default Home;
