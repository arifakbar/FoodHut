import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Nav from "./components/nav";
import RegisterComplete from "./pages/auth/registerComplete";
// import Footer from "./pages/components/footer";
import ForgetPassword from "./pages/auth/forgetPassword";
import History from "./pages/user/history";
import UserRoute from "./components/routes/userRoute";
import AdminRoute from "./components/routes/adminRoute";
import ResetPassword from "./pages/user/resetPassword";
import Wishlist from "./pages/user/wishlist";
import Order from "./pages/user/orders";
import AdminDashboard from "./pages/admin/adminDashboard";
import UserProfile from "./pages/user/profile";
import ChangeName from "./pages/user/changeName";

import { auth } from "./firebase/firebase";
import { currentUserInfo } from "./actions/index";
import { currentUser } from "./functions/auth";

function App(props) {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const res = await currentUser(idTokenResult.token);
        await props.currentUserInfo(idTokenResult, res);
      }
    });
    return setTimeout(() => {
      unsubscribe();
    }, 3000);
  }, []);

  return (
    <>
      <ToastContainer />
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/register/complete" exact component={RegisterComplete} />
        <Route path="/forget/password" exact component={ForgetPassword} />
        <UserRoute path="/user/history" exact component={History} />
        <UserRoute path="/user/resetPassword" exact component={ResetPassword} />
        <UserRoute path="/user/wishlist" exact component={Wishlist} />
        <UserRoute path="/user/orders" exact component={Order} />
        <UserRoute path="/user/profile" exact component={UserProfile} />
        <UserRoute path="/user/changeName" exact component={ChangeName} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
      </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default connect(null, { currentUserInfo: currentUserInfo })(App);
