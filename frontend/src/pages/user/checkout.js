import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spin } from "antd";

import { appliedCoupon, CODAction, addToCartAction } from "../../actions/index";
import {
  getUserCart,
  applyDiscountCoupon,
  deleteUserCart,
} from "../../functions/auth";
import { createCashOrderForUser } from "../../functions/order";
import history from "../../history";

function Checkout(props) {
  const { user, couponApplied } = props;
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [product, setProduct] = useState([]);
  const [couponError, setCouponError] = useState("");
  const [totalAfterDicount, setTotalAfterDiscount] = useState(0);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getUserCart(user.token);
      setProduct(res.data.data.products);
      setTotal(res.data.data.cartTotal);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await applyDiscountCoupon(user.token, coupon);
      console.log(res.data.err);
      if (res.data.data) {
        setTotalAfterDiscount(res.data.data);
        props.appliedCoupon(true);
        setCoupon("");
      }
      if (res.data.err) {
        setCouponError(res.data.err);
        props.appliedCoupon(false);
        setCoupon("");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const cashOnDelivery = async () => {
    await props.CODAction(true);
    try {
      setLoading(true);
      const res = await createCashOrderForUser(user.token, couponApplied, true);
      if (res.data.ok) {
        if (typeof window !== undefined) {
          localStorage.removeItem("cart");
          props.appliedCoupon(false);
          props.addToCartAction([]);
          await deleteUserCart(user.token);
          setLoading(false);
          setTimeout(() => {
            history.push("/user/history");
          }, 1000);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container p-5">
      <div className="checkout-apply">
        <div className="checkout-address">
          <h4>Address</h4>
          <p>{user.address}</p>
          <Link to="/user/profile" className="btn btn-raised btn-success">
            Change Address
          </Link>
        </div>
        <br />
        <hr />
        <br />
        <div className="checkout-coupon position-relative">
          {loading ? (
            <div className="center-spinner">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <h6>Have a coupon ?</h6>
              <form onSubmit={handleCouponSubmit}>
                <input
                  type="text"
                  className="form-control my-3"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button className="btn btn-raised btn-primary">Apply</button>
              </form>
              {couponError && (
                <p className="p-2 border bg-danger mt-2 text-white">
                  {couponError}
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div className="checkout-summary">
        <h4>Order Summary</h4>
        <div className="order-summary border p-2">
          {product &&
            product.map((p, i) => {
              return (
                <div key={i}>
                  <p>
                    {i + 1}. {p.product.title} x {p.count} = Rs.{" "}
                    {p.product.price * p.count}
                  </p>
                </div>
              );
            })}
          <hr />
          <p style={{ fontSize: "18px" }}>Total: Rs. {total}</p>
          {totalAfterDicount > 0 && (
            <p style={{ fontSize: "18px" }}>
              After Discount: Rs. {totalAfterDicount}
            </p>
          )}
        </div>
        <div>
          <Link to="/payment">
            <button className="btn btn-success m-2" disabled={!user.address}>
              Checkout
            </button>
          </Link>
          <button
            className="btn btn-primary m-2"
            disabled={!user.address}
            onClick={cashOnDelivery}
          >
            Cash on Delivery
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user, couponApplied: state.coupon };
};

export default connect(mapStateToProps, {
  appliedCoupon: appliedCoupon,
  CODAction: CODAction,
  addToCartAction: addToCartAction,
})(Checkout);
