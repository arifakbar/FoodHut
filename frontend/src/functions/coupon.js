import axios from "axios";

export const getAllCoupons = async (authToken) => {
  return await axios.get(process.env.REACT_APP_API + "/coupons", {
    headers: { authToken: authToken },
  });
};

export const getCoupon = async (authToken, couponId) => {
  return await axios.get(process.env.REACT_APP_API + "/coupon/" + couponId, {
    headers: { authToken: authToken },
  });
};

export const addCoupon = async (authToken, name, discount, expiry) => {
  return await axios.post(
    process.env.REACT_APP_API + "/coupon",
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
  return await axios.delete(process.env.REACT_APP_API + "/coupon/" + couponId, {
    headers: { authToken: authToken },
  });
};
