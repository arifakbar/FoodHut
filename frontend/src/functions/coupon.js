import axios from "axios";

export const getAllCoupons = async (authToken) => {
  return await axios.get("/api/coupons", {
    headers: { authToken: authToken },
  });
};

export const getCoupon = async (authToken, couponId) => {
  return await axios.get("/api/coupon/" + couponId, {
    headers: { authToken: authToken },
  });
};

export const addCoupon = async (authToken, name, discount, expiry) => {
  return await axios.post(
    "/api/coupon",
    {
      name: name,
      discount: discount,
      expiry: expiry,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const deleteCoupon = async (authToken, couponId) => {
  return await axios.delete("/api/coupon/" + couponId, {
    headers: { authToken: authToken },
  });
};
