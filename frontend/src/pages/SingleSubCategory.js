import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Spin, Card } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { getSubCategory } from "../functions/subCategory";
import { addToCartAction } from "../actions/index";
import Footer from "../components/footer";
import SideCart from "../components/forms/SideCart";
import balckBg1 from "../images/block-bg-1.png";
import balckBg2 from "../images/block-bg-2.png";

const { Meta } = Card;

function SingleSubCategory(props) {
  const { slug } = props.match.params;
  const [products, setProducts] = useState([]);
  const [sub, setSub] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getSubCategory(slug);
      setProducts(res.data.products);
      setSub(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  const addToCart = async (p) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      let found = false;
      cart.forEach((c) => {
        if (c._id === p._id) {
          found = true;
        }
      });
      if (found === true) {
        return;
      }
      cart.push({ ...p, count: 1 });
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      props.addToCartAction(unique);
    }
  };

  return (
    <div className="container-fluid position-relative">
      <img
        src={balckBg2}
        alt="NF"
        style={{ position: "absolute", top: "-3%", left: "0%" }}
      />
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div
            className="d-flex justify-content-between mb-5"
            style={{ minHeight: "100vh" }}
          >
            <div className="filter-products" style={{ width: "70%" }}>
              <h4
                className="mt-3 mb-0"
                style={{
                  textDecoration: "underline",
                  fontFamily: "Sail",
                  fontSize: "45px",
                  color: "#da9816",
                }}
              >
                {sub.name}
              </h4>
              <div className="row p-3" style={{ width: "100%" }}>
                {products.length > 0 &&
                  products.map((p) => {
                    return (
                      <div className="mt-2 my-2 col-sm-4" key={p._id}>
                        <Card
                          hoverable
                          cover={
                            <img
                              alt="example"
                              src={p.images && p.images[0].url}
                              style={{ height: "200px", objectFit: "fill" }}
                            />
                          }
                          actions={[
                            <button
                              className="btn btn-raised btn-success"
                              style={{ width: "80%" }}
                              disabled={p.quantity <= 1}
                              onClick={() => addToCart(p)}
                            >
                              {p.quantity <= 1 ? "Out of Stock" : "ADD"}
                            </button>,
                            <Link to={`/product/${p._id}`}>
                              <button
                                className="btn btn-raised btn-primary"
                                style={{ width: "80%" }}
                              >
                                View
                              </button>
                              ,
                            </Link>,
                          ]}
                        >
                          <Meta
                            title={p.title}
                            description={[
                              <div key={p._id}>
                                <p>Rs. {p.price}</p>
                                <p>
                                  {p.description &&
                                    p.description.substring(0, 30)}
                                  ...
                                </p>
                              </div>,
                            ]}
                          />
                        </Card>
                      </div>
                    );
                  })}
              </div>
            </div>
            <SideCart />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default connect(null, { addToCartAction: addToCartAction })(
  SingleSubCategory
);
