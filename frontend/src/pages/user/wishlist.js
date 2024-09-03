import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Spin } from "antd";

import UserSideNav from "../../components/userSideNav";
import { userWishlists, removeFromWishlist } from "../../functions/auth";
import balckBg1 from "../../images/block-bg-1.png";
import balckBg2 from "../../images/block-bg-2.png";
import { Link } from "react-router-dom";

function Wishlist(props) {
  const { user } = props;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await userWishlists(user.token);
      setProducts(res.data.data.wishlist);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  const handleRemove = async (p) => {
    try {
      const res = await removeFromWishlist(user.token, p._id);
      if (res.data.ok) {
        toast.success("Removed from wishlist");
        loadProducts();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <UserSideNav />
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div
          className="d-flex flex-column align-items-center login-container"
          style={{ gap: "15px" }}
        >
          <img
            src={balckBg1}
            alt="NF"
            style={{ position: "absolute", top: "0", right: "0" }}
          />
          <img
            src={balckBg2}
            alt="NF"
            style={{ position: "absolute", bottom: "0%", left: "0" }}
          />
          <div className="login-heading">
            <hr />
            <h4 className="text-center m-0">Wishlist</h4>
            <hr />
          </div>
          <div className="row p-2" style={{ width: "75%", height: "80%" }}>
            {products &&
              products.map((p) => {
                return (
                  <div className=" col-sm-3" key={p._id}>
                    <div
                      className="border p-3"
                      style={{ boxShadow: "0px 3px 6px rgba(0,0,0,0.3)" }}
                    >
                      <div>
                        <img
                          src={p.images[0].url}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <br />
                      <p>{p.title}</p>
                      <p>Rs .{p.price}</p>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <Link to={`/product/${p._id}`}>
                          <button className="btn btn-raised btn-primary mt-3">
                            View
                          </button>
                        </Link>
                        <button
                          className="btn btn-raised btn-danger mt-3"
                          onClick={(e) => handleRemove(p)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Wishlist);
