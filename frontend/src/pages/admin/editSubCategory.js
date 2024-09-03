import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";

import history from "../../history";
import { updateSubCategory, getSubCategory } from "../../functions/subCategory";
import { getAllCategories } from "../../functions/category";

function EditSubCategory(props) {
  const { user } = props;
  const { slug } = props.match.params;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadSubCategory();
    loadCategories();
  }, []);

  const loadSubCategory = async () => {
    setLoading(true);
    try {
      const res = await getSubCategory(slug);
      setCategory(res.data.data.parent);
      setName(res.data.data.name);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

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
      const res = await updateSubCategory(user.token, name, category, slug);
      toast.success(`${res.data.data.name} category updated successfully.`);
      setLoading(false);
      history.push("/admin/sub-category");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <>
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <form
          className="border p-5 auth-form"
          style={{ width: "80%" }}
          onSubmit={handleSubmit}
        >
          <h4 className="text-center mb-3">EDIT SUB-CATEGORY</h4>
          <div className="mb-3">
            <label className="form-label">Sub-Category Name : </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter new name "
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.length > 0 &&
                categories.map((c) => {
                  return (
                    <option
                      key={c._id}
                      value={c._id}
                      selected={c._id === category}
                    >
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <button
            className="btn btn-raised text-white btn-block"
            style={{ background: "#f16121" }}
          >
            UPDATE
          </button>
        </form>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(EditSubCategory);
