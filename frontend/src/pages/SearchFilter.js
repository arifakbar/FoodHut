import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Spin, Slider, Card, Tooltip } from "antd";
import _ from "lodash";
import { connect } from "react-redux";

import { getProductsByCount, searchProduct } from "../functions/product";
import { getAllSubCategoris } from "../functions/subCategory";
import { getAllCategories } from "../functions/category";
import Star from "../components/Star";
import Search from "../components/Search";
import { addToCartAction } from "../actions/index";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const { Meta } = Card;

function SearchFilter(props) {
  const { cart } = props;

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(false);
  const [cats, setCats] = useState([]);
  const [subs, setSubs] = useState([]);
  const [query, setQuery] = useState("");
  const [tooltip, setTooltip] = useState("Click to Add");

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadSubCategories();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getProductsByCount(5);
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

  const handleStarClick = async () => {};

  const addToCart = async (p) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({ ...p, count: 1 });
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      props.addToCartAction(unique);
      setTooltip("Added. Check your basket to set quantity.");
    }
  };

  const handleQuantityChange = (e, p) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count >= p.quantity - 1) {
      toast.error("Max quantity reached");
      return;
    }
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (p._id === product._id) {
          cart[i].count = e.target.value;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      props.addToCartAction(cart);
    }
  };

  const removeFromCart = (p) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (p._id === product._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      props.addToCartAction(cart);
    }
  };

  return (
    <>
      <div className="container-fluid searchFilter-container">
        {loading ? (
          <div className="center-spinner">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="filters">
              <div className="filters-nav">
                <div className="filter-cats">
                  <button className="filter-btn">Snacks</button>
                  <button className="filter-btn">Full Course</button>
                  <button className="filter-btn">Drinks</button>
                  <button className="filter-btn">Sweets</button>
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
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
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
                          <div>
                            Range
                            <Slider
                              className="ml-4 mr-4"
                              tipFormatter={(v) => `Rs.${v}`}
                              range
                              //   value={price}
                              max={2000}
                              //   onChange={handlePriceSlider}
                            />
                          </div>
                          <hr />
                          <div>
                            Categories
                            <br />
                            {cats &&
                              cats.map((c) => {
                                return (
                                  <button
                                    className="btn btn-raised btn-sm m-1"
                                    key={c._id}
                                  >
                                    {c.name}
                                  </button>
                                );
                              })}
                          </div>
                          <hr />
                          <div>
                            Sub Categories
                            <br />
                            {cats &&
                              subs.map((s) => {
                                return (
                                  <button
                                    className="btn btn-raised btn-sm m-1"
                                    key={s._id}
                                  >
                                    {s.name}
                                  </button>
                                );
                              })}
                          </div>
                          <hr />
                          <div>
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
                          <hr />
                          <div>
                            <button className="btn btn-raised btn-sm m-1">
                              Veg
                            </button>
                            <button className="btn btn-raised btn-sm m-1">
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
                          <button type="button" className="btn btn-primary">
                            Save changes
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
                        <div className="mt-2 my-2 col-sm-3" key={p._id}>
                          <Card
                            hoverable
                            cover={
                              <img
                                alt="example"
                                src={p.images && p.images[0].url}
                                style={{ height: "150px", objectFit: "fill" }}
                              />
                            }
                            actions={[
                              // <Tooltip title={tooltip}>
                              //   <button
                              //     className="btn btn-raised btn-success"
                              //     style={{ width: "80%" }}
                              //     disabled={p.quantity <= 1}
                              //     onClick={() => addToCart(p)}
                              //   >
                              //     {p.quantity <= 1 ? "Out of Stock" : "ADD"}
                              //   </button>
                              // </Tooltip>,
                              <button
                                className="btn btn-raised btn-success"
                                style={{ width: "80%" }}
                                disabled={p.quantity <= 1}
                                onClick={() => addToCart(p)}
                              >
                                {p.quantity <= 1 ? "Out of Stock" : "ADD"}
                              </button>,
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
            <div className="filter-cart">
              <h4>Your Cart</h4>
              <div className="cart-items">
                {cart.length <= 0 ? (
                  <div className="empty-cart">
                    <div className="cart-icon-container">
                      <i className="fas fa-shopping-cart"></i>
                    </div>
                    <p>Add itmes to get started</p>
                  </div>
                ) : (
                  <>
                    <div className="border d-flex m-2 align-items-center justify-content-evenly py-2">
                      <p style={{ width: "40px" }}></p>
                      <p
                        style={{
                          width: "100px",
                        }}
                      >
                        Name
                      </p>
                      <p
                        style={{
                          width: "60px",
                        }}
                      >
                        Price
                      </p>
                      <p
                        style={{
                          width: "40px",
                        }}
                      >
                        Qty
                      </p>
                      <p
                        style={{
                          width: "60px",
                        }}
                      >
                        Total
                      </p>
                    </div>
                    {cart.map((c) => {
                      return (
                        <div
                          key={c._id}
                          className="border d-flex m-2 align-items-center justify-content-evenly py-2"
                        >
                          <button
                            className="cart-remove-btn"
                            style={{ width: "40px" }}
                            onClick={() => removeFromCart(c)}
                          >
                            X
                          </button>
                          <p
                            className="m-0"
                            style={{
                              width: "100px",
                            }}
                          >
                            {c.title && c.title.substring(0, 10)}
                          </p>
                          <p
                            className="m-0"
                            style={{
                              width: "60px",
                            }}
                          >
                            Rs. {c.price}
                          </p>
                          <input
                            type="number"
                            value={c.count}
                            style={{
                              width: "40px",
                            }}
                            min={1}
                            onChange={(e) => handleQuantityChange(e, c)}
                          />
                          <p
                            className="m-0"
                            style={{
                              width: "60px",
                            }}
                          >
                            Rs. {c.count * c.price}
                          </p>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
              <div className="cart-button-div">
                <Link to="/cart" className="cart-button">
                  Go to Cart
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return { cart: state.cart, user: state.user };
};

export default connect(mapStateToProps, { addToCartAction: addToCartAction })(
  SearchFilter
);
