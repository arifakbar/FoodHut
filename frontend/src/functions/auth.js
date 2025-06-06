import axios from "axios";
import history from "../history";

export const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    "/api/create-or-update-user",
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const currentUser = async (authToken) => {
  return await axios.post(
    "/api/current-user",
    {},
    {
      headers: { authToken: authToken },
    }
  );
};

export const currentAdmin = async (authToken) => {
  return await axios.post(
    "/api/current-admin",
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const updateUsername = async (username, authToken) => {
  return await axios.post(
    "/api/update-username",
    {
      username: username,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const updateAddress = async (address, authToken) => {
  return await axios.post(
    "/api/update-address",
    {
      address: address,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const sendOTP = async (authToken, number) => {
  return await axios.post(
    "/api/user/sendOTP",
    {
      number: number,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const verifyOTP = async (authToken, number, OTP) => {
  return await axios.post(
    "/api/user/verifyOTP",
    {
      number: number,
      OTP: OTP,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const userCart = async (cart, authToken) => {
  return await axios.post(
    "/api/user/cart",
    {
      cart: cart,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const getUserCart = async (authToken) => {
  return await axios.get("/api/user/cart", {
    headers: {
      authToken: authToken,
    },
  });
};

export const deleteUserCart = async (authToken) => {
  return await axios.delete("/api/user/cart", {
    headers: {
      authToken: authToken,
    },
  });
};

export const applyDiscountCoupon = async (authToken, coupon) => {
  return await axios.post(
    "/api/user/cart/coupon",
    {
      coupon: coupon,
    },
    { headers: { authToken: authToken } }
  );
};

export const roleBasedRedirect = (res) => {
  if (history.location.state) history.push(history.location.state.from);
  else {
    if (res.data.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/");
    }
  }
};

export const userWishlists = async (authToken) => {
  return await axios.get("/api/user/wishlists", {
    headers: { authToken: authToken },
  });
};

export const addToUserWishlist = async (authToken, productId) => {
  return await axios.post(
    "/api/user/wishlist",
    {
      productId: productId,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const removeFromWishlist = async (authToken, productId) => {
  return await axios.put(
    "/api/user/wishlist/" + productId,
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};
