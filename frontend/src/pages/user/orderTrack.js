import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

import { getOrderStatus } from "../../functions/order";

function OrderTrack(props) {
  const { user } = props;
  const { orderId } = props.match.params;

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const socket = useRef();

  useEffect(() => {
    loadOrderStatus();
    socket.current = io("ws://localhost:8000");
  }, []);

  useEffect(() => {
    socket.current.emit("join", orderId);
  }, [orderId]);

  useEffect(() => {
    socket.current.on("updated", (status) => {
      setStatus(status);
    });
  }, [status]);

  const loadOrderStatus = async () => {
    try {
      const res = await getOrderStatus(user.token, orderId);
      setStatus(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container p-5">
      <h3 className="text-center">Order Status</h3>
      <p className="text-center mt-5">
        Order ID: <b>{orderId}</b>
      </p>
      <div className="status-container">
        <div className={status === "Order Placed" && "currently"}>
          <p>Order Placed</p>
          <i class="fas fa-truck"></i>
        </div>
        <div className="connect-line"></div>
        <div className={status === "Order Confirmation" && "currently"}>
          <p>Order Confirmation</p>
          <i class="fas fa-truck"></i>
        </div>
        <div className="connect-line"></div>
        <div className={status === "Prepration" && "currently"}>
          <p>Prepration</p>
          <i class="fas fa-truck"></i>
        </div>
        <div className="connect-line"></div>
        <div className={status === "Out For Delivery" && "currently"}>
          <p>Out For Delivery</p>
          <i class="fas fa-truck"></i>
        </div>
        <div className="connect-line"></div>
        <div className={status === "Completed" && "currently"}>
          <p>Completed</p>
          <i class="fas fa-truck"></i>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(OrderTrack);
