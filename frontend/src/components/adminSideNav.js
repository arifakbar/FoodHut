import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminSideNav() {
  const [active, setActive] = useState(true);

  const handleClick = () => {
    const sideNav = document.querySelector(".sideNav");
    if (active) {
      sideNav.classList.remove("openMenu");
      sideNav.classList.add("closeMenu");
      setActive(false);
    } else {
      sideNav.classList.add("openMenu");
      sideNav.classList.remove("closeMenu");
      setActive(true);
    }
  };

  return (
    <div className="sideNav">
      <div className="sn-toggler" onClick={handleClick}>
        <i className="fas fa-bars"></i>
      </div>
      <Link to="/admin/dashboard" style={{ marginTop: "15px" }}>
        <div>Dashboard</div>
      </Link>
      <Link to="/admin/reservations">
        <div>Reservations</div>
      </Link>
      <Link to="/admin/product">
        <div>Product</div>
      </Link>
      <Link to="/admin/products">
        <div>Products</div>
      </Link>
      <Link to="/admin/category">
        <div>Category</div>
      </Link>
      <Link to="/admin/sub-category">
        <div>Sub-Category</div>
      </Link>
      <Link to="/admin/contacts">
        <div>Contacts</div>
      </Link>
      <Link to="/admin/coupons">
        <div>Coupons</div>
      </Link>
      <Link to="/admin/press">
        <div>Press</div>
      </Link>
      <Link to="/admin/resetPassword">
        <div>Password</div>
      </Link>
    </div>
  );
}

export default AdminSideNav;
