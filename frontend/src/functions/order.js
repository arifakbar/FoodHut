import axios from "axios";

export const createOrder = async (authToken, stripeResponse) => {
  return await axios.post(
    "/api/user/order",
    {
      stripeResponse: stripeResponse,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const getAllOrders = async (authToken, page) => {
  return await axios.post(
    "/api/orders",
    {
      page: page,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const getUserOrders = async (authToken) => {
  return await axios.get("/api/user/orders", {
    headers: { authToken: authToken },
  });
};

export const ordersCount = async () => {
  return await axios.get("/api/orders/total");
};

export const updateOrderStatus = async (authToken, orderId, orderStatus) => {
  return await axios.put(
    "/api/order/" + orderId,
    {
      orderStatus: orderStatus,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const createCashOrderForUser = async (authToken, couponApplied, COD) => {
  return await axios.post(
    "/api/user/cash-order",
    {
      COD: COD,
      couponApplied: couponApplied,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const getOrderStatus = async (authToken, orderId) => {
  return await axios.get("/api/order/" + orderId, {
    headers: { authToken: authToken },
  });
};
