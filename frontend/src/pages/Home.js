import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ height: "100vh" }}>
      <h1>Home</h1>
      <ul className="container d-flex flex-column">
        <Link className="m-2 border p-2 bg-dark text-white" to="/user/history">
          History
        </Link>
        <Link
          className="m-2 border p-2 bg-dark text-white"
          to="/user/resetPassword"
        >
          Reset Password
        </Link>
        <Link className="m-2 border p-2 bg-dark text-white" to="/user/wishlist">
          Wishlist
        </Link>
        <Link className="m-2 border p-2 bg-dark text-white" to="/user/orders">
          Orders
        </Link>
        <Link
          className="m-2 border p-2 bg-dark text-white"
          to="/admin/dashboard"
        >
          Admin dashboard
        </Link>
      </ul>
    </div>
  );
}

export default Home;
