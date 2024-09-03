import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-timings">
          <div>
            <p>Monday - Friday</p>
            <small>9 AM - 9 PM</small>
          </div>
          <div>
            <p>Saturday - Sunday</p>
            <small>1 PM - 8 PM</small>
          </div>
        </div>
        <div className="footer-contact">
          <p>000 123 4567</p>
          <small>Lorem ipsum dolor</small>
          <br />
          <small>Lorem ipsum dolor</small>
          <br />
          <small>sit amet</small>
        </div>
        <div className="footer-info">
          <p>FOR YOU</p>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
        </div>
        <div className="footer-links">
          <p>SOCIAL LINKS</p>
          <div>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <small>©FoodHut 2022</small>
        </div>
        <div className="footer-newsletter">
          <p>
            GET THE LATEST NEWS, <br />
            SIGN UP FOR NEWSLETTER
          </p>
          <button>SIGN UP</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
