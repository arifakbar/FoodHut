import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
import { couponReducer } from "./couponReducer";
import { CODReducer } from "./CODReducer";

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
  coupon: couponReducer,
  cod: CODReducer,
});
