import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AdminSideNav from "../../components/adminSideNav";
import LocalSearch from "../../components/forms/LocalSearch";
import { getAllCategories } from "../../functions/category";
import {
  getAllSubCategoris,
  addSubCategory,
  deleteSubCategory,
} from "../../functions/subCategory";

function SubCategory(props) {
  const { user } = props;

  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      setCategories(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const loadSubCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllSubCategoris();
      setSubs(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addSubCategory(user.token, name, category);
      toast.success(`${res.data.data.name} sub-category created successfully.`);
      setLoading(false);
      setName("");
      loadSubCategories();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (s) => {
    try {
      setLoading(true);
      if (
        window.confirm(`Do you really want to delete ${s.name} sub-category?`)
      ) {
        const res = await deleteSubCategory(user.token, s.slug);
        if (res.data.ok) {
          toast.success(`${s.name} sub-category deleted successfully.`);
          loadSubCategories();
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
          <h2 className="">Add Sub-Category</h2>
          <form
            className="border p-5"
            style={{ width: "80%" }}
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label className="form-label">Sub-Category Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Please select</option>
                {categories.length > 0 &&
                  categories.map((c) => {
                    return (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    );
                  })}
              </select>
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
              <h4 className="text">All Categories</h4>
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            </div>

            <div>
              {subs.length > 0 && (
                <ul className="list-group">
                  {subs.filter(searchResults(keyword)).map((s) => {
                    return (
                      <li
                        className="list-group-item border-1 d-flex justify-content-between align-items-center my-1 px-2"
                        key={s._id}
                      >
                        {s.name.toUpperCase()}
                        <div className="d-flex" style={{ gap: "5px" }}>
                          <Link
                            className="btn btn-raised btn-primary"
                            to={`/edit-sub-category/${s.slug}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-raised btn-danger"
                            onClick={() => handleDelete(s)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(SubCategory);
