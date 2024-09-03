import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Spin, Card } from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";

import { searchProduct, filterProducts } from "../functions/product";
import { getAllSubCategoris } from "../functions/subCategory";
import { getAllCategories } from "../functions/category";
import Star from "../components/Star";
import Search from "../components/Search";
import Footer from "../components/footer";
import SideCart from "../components/forms/SideCart";
import { addToCartAction } from "../actions/index";
import balckBg1 from "../images/block-bg-1.png";
import balckBg2 from "../images/block-bg-2.png";

const { Meta } = Card;

function SearchFilter(props) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(false);
  const [cats, setCats] = useState([]);
  const [subs, setSubs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadProducts({});
  }, []);

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadProducts = async (args) => {
    try {
      setLoading(true);
      const res = await filterProducts(args);
      setProducts(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await getAllCategories();
      setCats(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const loadSubCategories = async () => {
    try {
      setLoading(true);
      const res = await getAllSubCategoris();
      setSubs(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await searchProduct(query);
      setProducts(res.data.data);
      setLoading(false);
      setQuery("");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  const addToCart = async (p) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      let found = false;
      cart.forEach((c) => {
        if (c._id === p._id) {
          found = true;
        }
      });
      if (found === true) {
        return;
      }
      cart.push({ ...p, count: 1 });
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      props.addToCartAction(unique);
    }
  };

  const handleCategoryClick = (id) => {
    loadProducts({ category: id });
  };

  const handleStarClick = (value) => {
    loadProducts({ stars: value });
  };

  const handleSubCategoryClick = (id) => {
    loadProducts({ subCategory: id });
  };

  const handleSliderClick = (value) => {
    loadProducts({ price: value });
  };

  const handleVegClick = (value) => {
    loadProducts({ veg: value });
  };

  return (
    <>
      <div
        className="container-fluid searchFilter-container position-relative"
        style={{ minHeight: "124vh" }}
      >
        <img
          src={balckBg1}
          alt="NF"
          style={{ position: "absolute", top: "63.5%", right: "0%" }}
        />
        <img
          src={balckBg2}
          alt="NF"
          style={{ position: "absolute", top: "5%", left: "0%" }}
        />
        {loading ? (
          <div className="center-spinner">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="filters">
              <div className="filters-nav">
                <div className="filter-cats">
                  {cats &&
                    cats.map((c) => {
                      return (
                        <button
                          className="filter-btn"
                          key={c._id}
                          onClick={() => handleCategoryClick(c._id)}
                        >
                          {c.name}
                        </button>
                      );
                    })}
                </div>

                <div className="filter-search">
                  <button className="filter-btn">
                    <Search
                      query={query}
                      setQuery={setQuery}
                      handleSearchSubmit={handleSearchSubmit}
                    />
                  </button>
                  <button
                    className="filter-btn"
                    type="button"
                    data-mdb-toggle="modal"
                    data-mdb-target="#exampleModal"
                  >
                    <i className="fas fa-filter"></i>
                  </button>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div
                        className="modal-content"
                        style={{
                          background: "#091921",
                          boxShadow: "0 5px 10px rgba(0,0,0,0.5)",
                        }}
                      >
                        <div className="modal-header">
                          <h5
                            className="modal-title text-white"
                            id="exampleModalLabel"
                          >
                            Filters
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-mdb-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="text-white">
                            Range
                            {/* <Slider
                              className="ml-4 mr-4"
                              tipFormatter={(v) => `Rs.${v}`}
                              range
                              name="price"
                              onChange={handleSliderClick}
                              // value={price}
                              max={5000}
                              //   onChange={handlePriceSlider}
                            /> */}
                            <div>
                              <button
                                className="btn btn-raised bg-white btn-sm mx-1"
                                onClick={() => handleSliderClick([0, 500])}
                              >
                                0 - 500
                              </button>
                              <button
                                className="btn btn-raised bg-white btn-sm mx-1"
                                onClick={() => handleSliderClick([500, 1000])}
                              >
                                500 - 1000
                              </button>
                              <button
                                className="btn btn-raised bg-white btn-sm mx-1"
                                onClick={() => handleSliderClick([1000, 2000])}
                              >
                                1000 - 2000
                              </button>
                              <button
                                className="btn btn-raised bg-white btn-sm mx-1"
                                onClick={() => handleSliderClick([2000, 5000])}
                              >
                                2000 - 5000
                              </button>
                            </div>
                          </div>
                          <hr className="bg-white" />
                          <div className="text-white">
                            Sub Categories
                            <br />
                            {cats &&
                              subs.map((s) => {
                                return (
                                  <button
                                    className="btn btn-raised btn-sm m-1 bg-white"
                                    key={s._id}
                                    onClick={() =>
                                      handleSubCategoryClick(s._id)
                                    }
                                  >
                                    {s.name}
                                  </button>
                                );
                              })}
                          </div>
                          <hr className="bg-white" />
                          <div className="text-white">
                            Ratings
                            <br />
                            <div className="pr-4 pl-4 pb-2">
                              <Star stars={1} starClick={handleStarClick} />
                              <Star stars={2} starClick={handleStarClick} />
                              <Star stars={3} starClick={handleStarClick} />
                              <Star stars={4} starClick={handleStarClick} />
                              <Star stars={5} starClick={handleStarClick} />
                            </div>
                          </div>
                          <hr className="bg-white" />
                          <div>
                            <button
                              className="btn btn-raised bg-white btn-sm m-1"
                              onClick={() => {
                                handleVegClick(true);
                              }}
                            >
                              Veg
                            </button>
                            <button
                              className="btn btn-raised bg-white btn-sm m-1"
                              onClick={() => {
                                handleVegClick(false);
                              }}
                            >
                              Non-Veg
                            </button>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-mdb-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-products">
                <div className="row p-3" style={{ width: "100%" }}>
                  {products.length > 0 &&
                    products.map((p) => {
                      return (
                        <div className="mt-2 my-2 col-sm-4" key={p._id}>
                          <Card
                            hoverable
                            cover={
                              <img
                                alt="example"
                                src={p.images && p.images[0].url}
                                style={{ height: "200px", objectFit: "fill" }}
                              />
                            }
                            actions={[
                              <button
                                className="btn btn-raised btn-success text-uppercase"
                                style={{ width: "80%" }}
                                disabled={p.quantity <= 1}
                                onClick={() => addToCart(p)}
                              >
                                {p.quantity <= 1 ? "unavailable" : "ADD"}
                              </button>,
                              <Link to={`/product/${p._id}`}>
                                <button
                                  className="btn btn-raised btn-primary"
                                  style={{ width: "80%" }}
                                >
                                  View
                                </button>
                                ,
                              </Link>,
                            ]}
                          >
                            <Meta
                              title={p.title}
                              description={[
                                <div key={p._id}>
                                  <p>Rs. {p.price}</p>
                                  <p>
                                    {p.description &&
                                      p.description.substring(0, 30)}
                                    ...
                                  </p>
                                </div>,
                              ]}
                            />
                          </Card>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <SideCart />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default connect(null, { addToCartAction: addToCartAction })(
  SearchFilter
);
