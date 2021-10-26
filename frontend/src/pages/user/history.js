import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { Pagination } from "antd";

import UserSideNav from "../../components/userSideNav";
import { getUserOrders } from "../../functions/order";
import balckBg1 from "../../images/block-bg-1.png";
import balckBg2 from "../../images/block-bg-2.png";

function History(props) {
  const { user } = props;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await getUserOrders(user.token);
      setOrders(res.data.data);
      console.log(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <UserSideNav />
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div className="login-container">
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
            <h4 className="text-center m-0">Purchase History</h4>
            <hr />
          </div>
          <div className="user-orders">
            <div className="user-orders-list">
              {orders ? (
                <>
                  {orders.map((o) => {
                    return (
                      <div
                        key={o._id}
                        className="border p-3 d-flex align-items-center justify-content-between"
                        style={{ width: "100%" }}
                      >
                        <div
                          style={{
                            width: "35%",
                            borderRight: "2px dashed #da9816",
                          }}
                        >
                          <h6>Order Id: {o._id}</h6>
                          <p>Amount : Rs. {o.paymentIntent.amount / 100}</p>
                          <p>
                            Currency : {o.paymentIntent.currency.toUpperCase()}
                          </p>
                          <p>
                            Method :{" "}
                            {o.paymentIntent.payment_method_types[0].toUpperCase()}
                          </p>
                          <p>Status : {o.paymentIntent.status.toUpperCase()}</p>
                          <p>
                            Ordered On :{" "}
                            {new Date(
                              o.paymentIntent.created * 1000
                            ).toLocaleString()}
                          </p>
                          <p>Delivery Status: {o.orderStatus}</p>
                          <button className="btn btn-primary">
                            Track Package
                          </button>
                        </div>
                        <div
                          className="d-flex gap-3 px-3"
                          style={{ maxWidth: "65%", overflow: "auto" }}
                        >
                          {o.products.map((p) => {
                            return (
                              <div
                                key={p.product._id}
                                className="my-2 d-flex flex-column gap-3"
                              >
                                <div>
                                  <img
                                    src={p.product.images[0].url}
                                    style={{
                                      height: "150px",
                                      width: "150px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                                <div>
                                  <p>{p.product.title}</p>
                                  <p>
                                    {p.count} X Rs. {p.product.price} = Rs.{" "}
                                    {p.count * p.product.price}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                "No orders yet."
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(History);
