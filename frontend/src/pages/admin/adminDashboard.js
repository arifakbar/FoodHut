import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { Pagination } from "antd";
import { io } from "socket.io-client";

import AdminSideNav from "../../components/adminSideNav";
import {
  getAllOrders,
  updateOrderStatus,
  ordersCount,
} from "../../functions/order";

function AdminDashboard(props) {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const { user } = props;

  const socket = useRef();

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await getAllOrders(user.token, page);
      setOrders(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    totalOrders();
    loadOrders();
    socket.current = io("ws://localhost:8000");
  }, [page]);

  const totalOrders = async () => {
    try {
      setLoading(true);
      const res = await ordersCount();
      setCount(res.data.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  const updateStatus = async (e, o) => {
    socket.current.emit("orderUpdated", {
      orderId: o._id,
      orderStatus: e.target.value,
    });
    try {
      setLoading(true);
      await updateOrderStatus(user.token, o._id, e.target.value);
      toast.success("status updated successfully");
      loadOrders();
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminSideNav />
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div
            className="d-flex flex-column align-items-center"
            style={{ gap: "15px" }}
          >
            <h2 className="my-2">Dashboard</h2>
            <div className="row p-2" style={{ width: "80%" }}>
              {orders.length > 0 &&
                orders.map((o) => {
                  return (
                    <div className=" col-sm-3 my-2" key={o._id}>
                      <div className="border p-2">
                        <p>Id: {o._id}</p>
                        <p>User Id: {o.orderedBy}</p>
                        <p>
                          Ordered At:{" "}
                          {new Date(
                            o.paymentIntent.created * 1000
                          ).toLocaleString()}
                        </p>
                        <p>Amount : Rs. {o.paymentIntent.amount / 100}</p>
                        <label>Status: </label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            updateStatus(e, o);
                          }}
                        >
                          <option
                            value="Order Placed"
                            selected={o.orderStatus === "Order Placed"}
                          >
                            Order Placed
                          </option>
                          <option
                            value="Cash On Delivery"
                            selected={o.orderStatus === "Cash On Delivery"}
                          >
                            Cash On Delivery
                          </option>
                          <option
                            value="Order Confirmation"
                            selected={o.orderStatus === "Order Confirmation"}
                          >
                            Order Confirmation
                          </option>
                          <option
                            value="Prepration"
                            selected={o.orderStatus === "Prepration"}
                          >
                            Prepration
                          </option>
                          <option
                            value="Cancelled"
                            selected={o.orderStatus === "Cancelled"}
                          >
                            Cancelled
                          </option>
                          <option
                            value="Out For Delivery"
                            selected={o.orderStatus === "Out For Delivery"}
                          >
                            Out For Delivery
                          </option>
                          <option
                            value="Completed"
                            selected={o.orderStatus === "Completed"}
                          >
                            Completed
                          </option>
                        </select>
                      </div>
                    </div>
                  );
                })}
            </div>
            <Pagination
              current={page}
              total={(count / 15) * 10}
              onChange={(value) => setPage(value)}
            />
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(AdminDashboard);
