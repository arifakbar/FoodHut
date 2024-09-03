import {
  CURRENT_USER_INFO,
  LOGOUT,
  LOGGED_IN_USER,
  ADD_TO_CART,
  COUPON_APPLIED,
  COD,
} from "./types";

import firebase from "firebase/compat/app";

export const loggedInUser = (idTokenResult, res) => {
  return {
    type: LOGGED_IN_USER,
    payload: {
      token: idTokenResult.token,
      name: res.data.data.name,
      email: res.data.data.email,
      role: res.data.data.role,
      phoneNumber: res.data.data.phoneNumber,
      address: res.data.data.address,
      _id: res.data.data._id,
    },
  };
};

export const currentUserInfo = (idTokenResult, res) => {
  return {
    type: CURRENT_USER_INFO,
    payload: {
      token: idTokenResult.token,
      name: res.data.data.name,
      email: res.data.data.email,
      role: res.data.data.role,
      phoneNumber: res.data.data.phoneNumber,
      address: res.data.data.address,
      _id: res.data.data._id,
    },
  };
};

export const logoutUser = () => {
  firebase.auth().signOut();
  return {
    type: LOGOUT,
    payload: null,
  };
};

export const addToCartAction = (unique) => {
  return {
    type: ADD_TO_CART,
    payload: unique,
  };
};

export const appliedCoupon = (status) => {
  return {
    type: COUPON_APPLIED,
    payload: status,
  };
};

export const CODAction = (status) => {
  return {
    type: COD,
    payload: status,
  };
};
