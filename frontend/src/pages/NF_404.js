import React from "react";
import { Link } from "react-router-dom";

function NF_404() {
  return (
    <div className="center-spinner">
      <h1 className="text-center text-danger" style={{ fontSize: "55px" }}>
        404
      </h1>
      <h1 className="text-danger">PAGE NOT FOUND</h1>
      <p className="text-center">
        <Link to="/">Go to Home</Link>
      </p>
    </div>
  );
}

export default NF_404;
