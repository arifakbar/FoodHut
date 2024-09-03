import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { Link } from "react-router-dom";

import AdminSideNav from "../../components/adminSideNav";
import {
  getAllCategories,
  addCategory,
  deleteCategory,
} from "../../functions/category";
import LocalSearch from "../../components/forms/LocalSearch";
import CatForm from "../../components/forms/catForm";

function Category(props) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const { user } = props;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      setCategories(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await addCategory(user.token, name);
      loadCategories();
      toast.success(`${res.data.data.name} category created successfully.`);
      setLoading(false);
      setName("");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleDelete = async (c) => {
    if (
      window.confirm(`Do you really want to delete ${c.name} category ?`) ===
      true
    ) {
      setLoading(true);
      try {
        const res = await deleteCategory(user.token, c.slug);
        if (res.data.ok) {
          toast.success(`${c.name} category deleted successfully.`);
          setLoading(false);
          loadCategories();
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      }
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
          <h2 className="">Add Category</h2>
          <CatForm
            handleSubmit={handleSubmit}
            Title="New Category"
            name={name}
            setName={setName}
            placeholder="Enter new category"
          />
          <hr style={{ width: "80%" }} />
          <div style={{ width: "80%" }}>
            <div className="change-search d-flex align-items-center justify-content-between">
              <h4 className="text">All Categories</h4>
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            </div>
            <div>
              {categories.length > 0 && (
                <ul className="list-group">
                  {categories.filter(searchResults(keyword)).map((c) => {
                    return (
                      <li
                        className="list-group-item border-1 d-flex justify-content-between align-items-center my-1 px-2"
                        key={c._id}
                      >
                        {c.name.toUpperCase()}
                        <div className="d-flex" style={{ gap: "5px" }}>
                          <Link
                            className="btn btn-raised btn-primary"
                            to={`/edit-category/${c.slug}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-raised btn-danger"
                            onClick={() => handleDelete(c)}
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

export default connect(mapStateToProps)(Category);
