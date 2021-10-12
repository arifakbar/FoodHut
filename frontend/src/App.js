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
import Product from "./pages/admin/product";
import Products from "./pages/admin/products";
import Category from "./pages/admin/category";
import SubCategory from "./pages/admin/subCategory";
import Coupons from "./pages/admin/coupons";
import AdminResetPassword from "./pages/admin/adminResetPassword";
import EditCategory from "./pages/admin/editcategory";
import EditSubCategory from "./pages/admin/editSubCategory";
import EditProduct from "./pages/admin/editProduct";
import ChangePhoneNumber from "./pages/user/changePhoneNumber";

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
        <UserRoute
          path="/user/changeNumber"
          exact
          component={ChangePhoneNumber}
        />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/product" exact component={Product} />
        <AdminRoute path="/admin/products" exact component={Products} />
        <AdminRoute path="/admin/category" exact component={Category} />
        <AdminRoute path="/admin/sub-category" exact component={SubCategory} />
        <AdminRoute path="/admin/coupons" exact component={Coupons} />
        <AdminRoute
          path="/edit-category/:slug"
          exact
          component={EditCategory}
        />
        <AdminRoute
          path="/admin/resetPassword"
          exact
          component={AdminResetPassword}
        />
        <AdminRoute
          path="/edit-sub-category/:slug"
          exact
          component={EditSubCategory}
        />
        <AdminRoute
          path="/edit-product/:productId"
          exact
          component={EditProduct}
        />
      </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default connect(null, { currentUserInfo: currentUserInfo })(App);
