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
import ForgetPassword from "./pages/auth/forgetPassword";
import History from "./pages/user/history";
import UserRoute from "./components/routes/userRoute";
import AdminRoute from "./components/routes/adminRoute";
import ResetPassword from "./pages/user/resetPassword";
import Wishlist from "./pages/user/wishlist";
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
import About from "./pages/about";
import Menu from "./pages/menu";
import Reservation from "./pages/reservation";
import Contact from "./pages/contact";
import AdminReservations from "./pages/admin/adminReservations";
import UserReservations from "./pages/user/userReservations";
import SearchFilter from "./pages/SearchFilter";
import Cart from "./pages/user/cart";
import { auth } from "./firebase/firebase";
import { currentUserInfo } from "./actions/index";
import { currentUser } from "./functions/auth";
import ChangeAddress from "./pages/user/changeAddress";
import Checkout from "./pages/user/checkout";
import Payment from "./pages/user/payment";
import Press from "./pages/press";
import SingleProduct from "./pages/SingleProduct";
import SingleCategory from "./pages/SingleCategory";
import SingleSubCategory from "./pages/SingleSubCategory";
import AdminContact from "./pages/admin/adminContact";
import OrderTrack from "./pages/user/orderTrack";
import NF_404 from "./pages/NF_404";
import AdminPress from "./pages/admin/AdminPress";
import EditPress from "./pages/admin/editPress";

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
  }, [props]);

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
        <Route path="/about" exact component={About} />
        <Route path="/menu" exact component={Menu} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/press" exact component={Press} />
        <Route path="/product/:productId" exact component={SingleProduct} />
        <Route path="/category/:slug" exact component={SingleCategory} />
        <Route path="/sub-category/:slug" exact component={SingleSubCategory} />
        <Route path="/reservation" exact component={Reservation} />
        <Route path="/search" exact component={SearchFilter} />
        <Route path="/cart" exact component={Cart} />
        <UserRoute path="/user/history" exact component={History} />
        <UserRoute path="/user/resetPassword" exact component={ResetPassword} />
        <UserRoute path="/user/wishlist" exact component={Wishlist} />
        <UserRoute path="/user/profile" exact component={UserProfile} />
        <UserRoute path="/user/changeName" exact component={ChangeName} />
        <UserRoute path="/user/address" exact component={ChangeAddress} />
        <UserRoute path="/checkout" exact component={Checkout} />
        <UserRoute
          path="/user/reservations"
          exact
          component={UserReservations}
        />
        <UserRoute path="/payment" exact component={Payment} />
        <UserRoute
          path="/user/changeNumber"
          exact
          component={ChangePhoneNumber}
        />
        <UserRoute path="/order-status/:orderId" exact component={OrderTrack} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute
          path="/admin/reservations"
          exact
          component={AdminReservations}
        />
        <AdminRoute path="/admin/contacts" exact component={AdminContact} />
        <AdminRoute path="/admin/product" exact component={Product} />
        <AdminRoute path="/admin/products" exact component={Products} />
        <AdminRoute path="/admin/category" exact component={Category} />
        <AdminRoute path="/admin/press" exact component={AdminPress} />
        <AdminRoute path="/admin/sub-category" exact component={SubCategory} />
        <AdminRoute path="/admin/coupons" exact component={Coupons} />
        <AdminRoute
          path="/edit-category/:slug"
          exact
          component={EditCategory}
        />
        <AdminRoute path="/edit-press/:id" exact component={EditPress} />
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
        <Route component={NF_404} />
      </Switch>
    </>
  );
}

export default connect(null, { currentUserInfo: currentUserInfo })(App);
