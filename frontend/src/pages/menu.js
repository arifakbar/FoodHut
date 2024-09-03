import React from "react";
import { Link } from "react-router-dom";

import menuFFPizza from "../images/menu-ff-pizza.jpg";
import menuFFFrankie from "../images/menu-ff-frankie.jpg";
import menuFFPasta from "../images/menu-ff-pasta.jpg";
import menuMeal from "../images/menu-meal.jpg";
import menuDrinksMocktail from "../images/menu-drinks-mocktail.jpg";
import menuDrinksShakes from "../images/menu-drinks-shakes.jpg";
import menuDrinksSoup from "../images/menu-drinks-soup.jpg";
import menuDessertBall from "../images/menu-desserts-ball.jpg";
import menuDessertIcecream from "../images/menu-desserts-icecream.jpg";
import menuDessertCake from "../images/menu-desserts-cake.jpg";
import menuDessertSandwich from "../images/menu-desserts-sandwich.jpg";
import balckBg1 from "../images/block-bg-1.png";
import balckBg2 from "../images/block-bg-2.png";
import balckBg3 from "../images/block-bg-3.png";
import Footer from "../components/footer";

function Menu() {
  return (
    <>
      <div className="container-fluid">
        <div style={{ height: "97vh" }}>
          <div className="menu-banner"></div>
        </div>
        <div className="menu">
          <div className="menu-fastfood-images">
            <div style={{ width: "100%", height: "60%", overflow: "hidden" }}>
              <img
                src={menuFFPizza}
                alt="NF"
                style={{ height: "100%", width: "100%", objectFit: "fill" }}
              />
            </div>
            <div
              style={{ width: "100%", height: "40%" }}
              className="d-flex justify-content-between"
            >
              <div style={{ width: "49%", height: "100%", overflow: "hidden" }}>
                <img
                  src={menuFFFrankie}
                  alt="NF"
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ width: "49%", height: "100%", overflow: "hidden" }}>
                <img
                  src={menuFFPasta}
                  alt="NF"
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
          <div className="menu-content" style={{ position: "relative" }}>
            <img
              src={balckBg1}
              alt="NF"
              style={{ position: "absolute", top: "-4.8%", right: "-2%" }}
            />
            <h1>Snacks</h1>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy
            </p>
            <small>Lorem ipsum dolor sit amet, consetetur</small>
            <Link to={`/category/snacks`}>
              <button className="menu-button">View Snacks</button>
            </Link>
          </div>
        </div>
        <br />
        <br />
        <div className="menu" style={{ height: "80vh", background: "#ececec" }}>
          <div className="menu-content" style={{ position: "relative" }}>
            <h1>Full Course</h1>
            <img
              src={balckBg2}
              alt="NF"
              style={{ position: "absolute", top: "-10%", left: "0" }}
            />
            <small>Lorem ipsum dolor sit amet, consetetur</small>
            <Link to={`/category/full-course`}>
              <button className="menu-button">View Full Course</button>
            </Link>
          </div>
          <div style={{ height: "100%", width: "50%" }}>
            <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
              <img
                src={menuMeal}
                alt="NF"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="menu" style={{ height: "80vh" }}>
          <div className="menu-fastfood-images">
            <div
              style={{ width: "100%", height: "40%" }}
              className="d-flex justify-content-between"
            >
              <div style={{ width: "49%", height: "100%", overflow: "hidden" }}>
                <img
                  src={menuDrinksSoup}
                  alt="NF"
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ width: "49%", height: "100%", overflow: "hidden" }}>
                <img
                  src={menuDrinksMocktail}
                  alt="NF"
                  style={{ height: "100%", width: "100%", objectFit: "fill" }}
                />
              </div>
            </div>
            <div style={{ width: "100%", height: "60%", overflow: "hidden" }}>
              <img
                src={menuDrinksShakes}
                alt="NF"
                style={{ height: "100%", width: "100%", objectFit: "fill" }}
              />
            </div>
          </div>
          <div className="menu-content" style={{ position: "relative" }}>
            <img
              src={balckBg3}
              alt="NF"
              style={{
                position: "absolute",
                top: "-8%",
                right: "-15%",
                zIndex: "-1",
              }}
            />
            <h1>Drinks</h1>
            <small>Lorem ipsum dolor sit amet, consetetur</small>
            <div className="menu-drinks-buttons">
              <Link to={`/sub-category/soups`}>
                <button className="menu-button">View Soups</button>
              </Link>
              <Link to={`/sub-category/mocktails`}>
                <button className="menu-button">View Mocktails</button>
              </Link>
              <Link to={`/sub-category/shakes`}>
                <button className="menu-button">View Shakes</button>
              </Link>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="menu" style={{ height: "80vh", background: "#ececec" }}>
          <div className="menu-desserts">
            <div className="menu-desserts-images">
              <img
                src={menuDessertBall}
                alt="NF"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="menu-desserts-images">
              <img
                src={menuDessertIcecream}
                alt="NF"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="menu-desserts-content">
            <h1>Sweets</h1>
            <small>Lorem ipsum dolor sit amet, consetetur</small>
            <Link to={`/category/sweets`}>
              <button className="menu-button">View Sweets</button>
            </Link>
          </div>
          <div className="menu-desserts">
            <div className="menu-desserts-images">
              <img
                src={menuDessertSandwich}
                alt="NF"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="menu-desserts-images">
              <img
                src={menuDessertCake}
                alt="NF"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}

export default Menu;
