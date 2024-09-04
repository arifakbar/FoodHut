import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "antd";
import logo from "../images/Logo.png";

import { createPaymentIntent } from "../functions/stripe";
import { createOrder } from "../functions/order";
import { appliedCoupon, addToCartAction } from "../actions/index";
import { deleteUserCart } from "../functions/auth";

function StripeCheckout(props) {
  const { user, coupon } = props;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntentFunction();
  }, []);

  const createPaymentIntentFunction = async () => {
    const res = await createPaymentIntent(user.token, coupon);
    console.log(res.data.data);
    setClientSecret(res.data.data.clientSecret);
    setCartTotal(res.data.data.cartTotal);
    setTotalAfterDiscount(res.data.data.totalAfterDiscount);
    setPayable(res.data.data.payable);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      const res = await createOrder(user.token, payload);
      if (res.data.ok) {
        if (typeof window !== undefined) {
          if (localStorage.getItem("cart")) {
            localStorage.removeItem("cart");
          }
          props.appliedCoupon(false);
          props.addToCartAction([]);
          await deleteUserCart(user.token);
        }
      }
      setError(null);
      setProcessing(false);
      setSuccess(true);
    }
  };
  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center gap-3 py-3">
      {!success && (
        <div style={{ width: "80%" }}>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
      <Card
        style={{ width: "80%" }}
        className="d-flex flex-column align-items-center"
        cover={
          <img
            src={logo}
            style={{ height: "200px", width: "200px", objectFit: "fill" }}
          />
        }
        actions={[]}
      />
      <div
        style={{ width: "80%" }}
        className="d-flex align-items-center justify-content-evenly"
      >
        <button className="btn btn-raised btn-warning">
          Total : Rs. {cartTotal}
        </button>
        <button className="btn btn-raised btn-success">
          Payable : Rs. {(payable / 100).toFixed(2)}
        </button>
      </div>
      {success ? (
        <div
          className="text-white bg-primary p-2 my-2 text-center"
          style={{ width: "80%" }}
        >
          Payment done successfully.
          <Link to="/user/history" className="p-2 text-danger">
            See purchase history.
          </Link>
        </div>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit} style={{ width: "80%", marginTop: "15px" }}>
        <CardElement onChange={handleChange} />
        {error && <div className="text-white bg-danger p-1 my-2">{error}</div>}
        <button
          disabled={processing || disabled}
          className="btn btn-block btn-primary btn-raised my-2"
        >
          {processing ? "Loding" : "Pay"}
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user, coupon: state.coupon };
};

export default connect(mapStateToProps, {
  appliedCoupon: appliedCoupon,
  addToCartAction: addToCartAction,
})(StripeCheckout);
