import axios from "axios";

export const createOrder = async (authToken, stripeResponse) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/order",
    {
      stripeResponse: stripeResponse,
    },
    {
      headers: { authToken: authToken },
    }
  );
};
