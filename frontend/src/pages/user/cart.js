import React, { useState } from "react";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ModalImage from "react-modal-image";

import balckBg1 from "../../images/block-bg-1.png";
import balckBg2 from "../../images/block-bg-2.png";
import { addToCartAction } from "../../actions";
import history from "../../history";
import { userCart } from "../../functions/auth";

function Cart(props) {
  const { cart } = props;
  const [loading, setLoading] = useState(false);

  const handleCountChange = (e, p) => {
    let count = e.target.value;
    if (count >= p.quantity - 1) {
      toast.error("Max. purchased limit reached");
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

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDB = async () => {
    try {
      setLoading(true);
      const res = await userCart(cart, props.user.token);
      if (res.data.ok) {
        history.push("/checkout");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid cart-container">
      <img
        src={balckBg1}
        alt="NF"
        style={{ position: "absolute", top: "50%", right: "-5%" }}
      />
      <img
        src={balckBg2}
        alt="NF"
        style={{ position: "absolute", top: "0", left: "-5%" }}
      />
      <h3 className="mb-5">Your Basket</h3>
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {cart.length > 0 ? (
            <div className="cart-products " style={{ zIndex: 1 }}>
              <div className="table-responsive">
                <table className="table text-center">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Remove</th>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((p) => {
                      return (
                        <tr className="table-active" key={p._id}>
                          <td>
                            <button
                              className="cart-remove-btn"
                              onClick={() => removeFromCart(p)}
                            >
                              X
                            </button>
                          </td>
                          <td>
                            <div
                              style={{
                                height: "80px",
                                width: "80px",
                                overflow: "hidden",
                              }}
                            >
                              <ModalImage
                                small={p.images[0].url}
                                large={p.images[0].url}
                              />
                            </div>
                          </td>
                          <td>{p.title}</td>
                          <td>Rs. {p.price}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              min={1}
                              value={p.count}
                              onChange={(e) => handleCountChange(e, p)}
                            />
                          </td>
                          <td>
                            {p.count} X {p.price} = Rs. {p.count * p.price}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <p
                  style={{
                    fontSize: "18px",
                    color: "white",
                    background: "#da9816",
                    width: "150px",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  Total: Rs. {getTotal()}
                </p>
              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <div className="cart-icon-container">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <p>Add itmes to get started</p>
            </div>
          )}
          <div className="cart-button-div cart-btn mt-5">
            {!props.user ? (
              <Link
                to={{ pathname: "/login", state: { from: "cart" } }}
                className="cart-button"
                disabled={!cart.length}
              >
                Login to Checkout
              </Link>
            ) : (
              <button
                onClick={saveOrderToDB}
                className="cart-button"
                disabled={!cart.length}
              >
                Place Order
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { cart: state.cart, user: state.user };
};

export default connect(mapStateToProps, { addToCartAction: addToCartAction })(
  Cart
);
