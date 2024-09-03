import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { addToCartAction } from "../../actions/index";

function SideCart(props) {
  const { cart } = props;
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
  );
}

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

export default connect(mapStateToProps, { addToCartAction: addToCartAction })(
  SideCart
);
