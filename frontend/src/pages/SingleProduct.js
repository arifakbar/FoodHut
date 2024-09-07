import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Spin, Card } from "antd";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import _ from "lodash";

import { getProduct, relatedProducts, productStar } from "../functions/product";
import { addToUserWishlist } from "../functions/auth";
import SideCart from "../components/forms/SideCart";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { addToCartAction } from "../actions/index";
import balckBg1 from "../images/block-bg-1.png";
import balckBg2 from "../images/block-bg-2.png";
import RatingModal from "../components/RatingModal";
import StarRatings from "react-star-ratings";
import { showAverageRating } from "../functions/rating";

const { Meta } = Card;

function SingleProduct(props) {
  const { productId } = props.match.params;
  const { user } = props;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);

  useEffect(() => {
    loadProduct();
    loadRelated();
  }, [productId]);

  useEffect(() => {
    if (product && product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  }, [product, user]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const res = await getProduct(productId);
      setProduct(res.data.data);
      console.log(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const loadRelated = async () => {
    try {
      setLoading(true);
      const res = await relatedProducts(productId);
      setRelated(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const addToWishlist = async () => {
    try {
      setLoading(true);
      const res = await addToUserWishlist(user.token, product._id);
      if (res.data.ok) {
        toast.success("Added to playlist");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
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
      // setTooltip("Added. Check your basket to set quantity.");
    }
  };

  const onStarClick = async (newRating, name) => {
    try {
      setStar(newRating);
      await productStar(user.token, newRating, name);
      toast.success("Thanks for your rating. It will appear soon.");
      loadProduct();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      <div
        className="container-fluid searchFilter-container position-relative"
        style={{ minHeight: "100vh" }}
      >
        <img
          src={balckBg1}
          alt="NF"
          style={{ position: "absolute", top: "50%", right: "0%" }}
        />
        <img
          src={balckBg2}
          alt="NF"
          style={{ position: "absolute", top: "35%", left: "0%" }}
        />
        {loading ? (
          <div className="center-spinner">
            <Spin size="large" />
          </div>
        ) : (
          <div className="d-flex flex-column">
            <div className="d-flex ">
              <div className="product-container">
                <div className="product-details">
                  <div className="carousel-div">
                    {product.images && product.images.length > 0 ? (
                      <Carousel autoPlay infiniteLoop showArrows={true}>
                        {product.images.map((i) => {
                          return <img src={i.url} key={i.public_id} alt="NF" />;
                        })}
                      </Carousel>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="info-div">
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{ width: "100%" }}
                    >
                      <h4>{product.title}</h4>
                      <h6>Rs. {product.price}</h6>
                    </div>
                    {product && product.ratings && product.ratings.length > 0
                      ? showAverageRating(product)
                      : "No ratings yet!"}
                    <button
                      className="btn btn-sm btn-danger"
                      style={{ minHeight: "30px" }}
                      onClick={() => {}}
                    >
                      {product.veg ? "Veg" : "Non-veg"}
                    </button>
                    <hr style={{ height: "1px", width: "100%" }} />
                    <p className="m-0"> {product.description}</p>
                    <hr style={{ height: "1px", width: "100%" }} />
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{ width: "100%" }}
                    >
                      <p className="m-0">Sold : {product.sold}</p>
                      <p className="m-0">Available : {product.quantity}</p>
                    </div>
                    <hr style={{ height: "1px", width: "100%" }} />
                    <p className="m-0">
                      Category :
                      <Link
                        to={`/category/${
                          product.category && product.category.slug
                        }`}
                      >
                        <button className="btn btn-sm mx-3">
                          {product.category && product.category.name}
                        </button>
                      </Link>
                    </p>
                    <hr style={{ height: "1px", width: "100%" }} />
                    <p>
                      Sub Category :{" "}
                      {product.subCategory &&
                        product.subCategory.map((s) => {
                          return (
                            <Link to={`/sub-category/${s.slug}`} key={s._id}>
                              <button className="btn btn-sm mx-1">
                                {s.name}
                              </button>
                            </Link>
                          );
                        })}
                    </p>
                    <hr style={{ height: "1px", width: "100%" }} />
                    <div
                      className="d-flex align-items-center justify-content-between mb-3"
                      style={{ width: "100%" }}
                    >
                      <button
                        className="btn btn-success btn-sm py-2"
                        onClick={() => addToCart(product)}
                      >
                        Add To Cart
                      </button>
                      <button
                        className="btn btn-primary btn-sm py-2"
                        onClick={addToWishlist}
                      >
                        Add To Wishlist
                      </button>
                      <RatingModal productId={productId}>
                        <StarRatings
                          name={product._id}
                          numberOfStars={5}
                          rating={star}
                          changeRating={onStarClick}
                          isSelectable={true}
                          starRatedColor="red"
                        />
                      </RatingModal>
                    </div>
                  </div>
                </div>
              </div>
              <SideCart />
            </div>
            <div className="related-products">
              <h4>Related Dishes </h4>
              <div className="row" style={{ width: "90%" }}>
                {related &&
                  related.map((p) => {
                    return (
                      <div className="mt-2 my-2 col-3" key={p._id}>
                        <Card
                          hoverable
                          cover={
                            <img
                              alt="example"
                              src={p.images && p.images[0].url}
                              style={{ height: "250px", objectFit: "fill" }}
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
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { addToCartAction: addToCartAction })(
  SingleProduct
);
