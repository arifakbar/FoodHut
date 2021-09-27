import { CURRENT_USER_INFO, LOGOUT, LOGGED_IN_USER } from "./types";

import firebase from "firebase/compat/app";

export const loggedInUser = (idTokenResult, res) => {
  return {
    type: LOGGED_IN_USER,
    payload: {
      token: idTokenResult.token,
      name: res.data.data.name,
      email: res.data.data.email,
      role: res.data.data.role,
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
