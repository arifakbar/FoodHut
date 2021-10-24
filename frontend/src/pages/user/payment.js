import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripeCheckout from "../../components/StripeCheckout";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Payment() {
  return (
    <Elements stripe={promise}>
      <div>
        <StripeCheckout />
      </div>
    </Elements>
  );
}

export default Payment;
