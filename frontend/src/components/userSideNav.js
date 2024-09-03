import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserSideNav() {
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
      <Link to="/user/profile">
        <div>Profile</div>
      </Link>
      <Link to="/user/history">
        <div>Purchase History</div>
      </Link>
      <Link to="/user/reservations">
        <div>My Reservations</div>
      </Link>
      <Link to="/user/resetPassword">
        <div>Reset Password</div>
      </Link>
      <Link to="/user/wishlist">
        <div>Wishlist</div>
      </Link>
    </div>
  );
}

export default UserSideNav;
