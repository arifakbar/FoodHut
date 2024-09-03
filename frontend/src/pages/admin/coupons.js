import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { DatePicker } from "antd";

import AdminSideNav from "../../components/adminSideNav";
import LocalSearch from "../../components/forms/LocalSearch";
import { addCoupon, deleteCoupon, getAllCoupons } from "../../functions/coupon";

function Coupons(props) {
  const { user } = props;

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [expiry, setExpiry] = useState("");

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    setLoading(true);
    try {
      const res = await getAllCoupons(user.token);
      setCoupons(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(expiry);
      const res = await addCoupon(user.token, name, discount, expiry);
      toast.success(`${res.data.data.name} coupon created successfully.`);
      setLoading(false);
      setName("");
      setDiscount(0);
      setExpiry("");
      loadCoupons();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (c) => {
    try {
      setLoading(true);
      if (window.confirm(`Do you really want to delete ${c.name} coupon?`)) {
        const res = await deleteCoupon(user.token, c._id);
        if (res.data.ok) {
          toast.success(`${c.name} coupon deleted successfully.`);
          loadCoupons();
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const searchResults = (keyword) => {
    return (c) => {
      return c.name.toLowerCase().includes(keyword);
    };
  };

  return (
    <div className="container p-4">
      <AdminSideNav />
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div
          className="d-flex flex-column align-items-center"
          style={{ gap: "15px" }}
        >
          <h2 className="">Add Coupon</h2>
          <form
            className="border p-5"
            style={{ width: "80%" }}
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label className="form-label">Coupon Name</label>
              <input
                type="text"
                className="form-control text-uppercase"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={6}
                maxLength={15}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Discount ( % )</label>
              <input
                type="number"
                className="form-control"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Expiry Date</label>
              <DatePicker
                className="form-control"
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>
            <button
              className="btn btn-block btn-raised text-white"
              style={{ background: "#f16121" }}
            >
              Add
            </button>
          </form>
          <hr style={{ width: "80%" }} />
          <div style={{ width: "80%" }}>
            <div className="change-search d-flex align-items-center justify-content-between">
              <h4 className="text">All Coupons</h4>
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            </div>
          </div>
          <div style={{ width: "80%" }}>
            {coupons.length > 0 && (
              <ul className="list-group">
                {coupons.filter(searchResults(keyword)).map((c) => {
                  return (
                    <li
                      className="list-group-item border-1 d-flex justify-content-between align-items-center my-1 px-2"
                      key={c._id}
                    >
                      {c.name.toUpperCase() + " --> " + c.discount + "%"}
                      <button
                        className="btn btn-raised btn-danger"
                        onClick={() => handleDelete(c)}
                      >
                        Delete
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Coupons);
