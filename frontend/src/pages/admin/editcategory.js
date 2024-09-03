import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";

import history from "../../history";
import { updateCategory, getCategory } from "../../functions/category";

function EditCategory(props) {
  const { user } = props;
  const { slug } = props.match.params;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    setLoading(true);
    try {
      const res = await getCategory(slug);
      setName(res.data.data.name);
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
      const res = await updateCategory(user.token, { name: name }, slug);
      toast.success(`${res.data.data.name} category updated successfully.`);
      setLoading(false);
      history.push("/admin/category");
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
          <h4 className="text-center mb-3">EDIT CATEGORY</h4>
          <div className="mb-3">
            <label className="form-label">Category Name : </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter new name "
            />
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

export default connect(mapStateToProps)(EditCategory);
