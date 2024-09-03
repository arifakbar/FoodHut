import { LOGGED_IN_USER, LOGOUT, CURRENT_USER_INFO } from "../actions/types";

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return action.payload;
    case CURRENT_USER_INFO:
      return action.payload;
    case LOGOUT:
      return action.payload;
    default:
      return state;
  }
};
