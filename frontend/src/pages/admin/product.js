import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { Select } from "antd";
import { connect } from "react-redux";

import AdminSideNav from "../../components/adminSideNav";
import { getAllCategories } from "../../functions/category";
import { getSubCategoryByParent } from "../../functions/subCategory";
import CloudinaryUpload from "../../components/forms/cloudinaryUpload";
import { createProduct } from "../../functions/product";
import history from "../../history";

const { Option } = Select;

function Product(props) {
  const { user } = props;
  const [loading, setLoading] = useState(false);
  const [categories, setCategoies] = useState([]);
  const [subs, setSubs] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [sold, setSold] = useState(0);
  const [veg, setVeg] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      setCategoies(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  const handleCategoryChange = async (id) => {
    setCategory(id);
    setSubCategories([]);
    setLoading(true);
    try {
      const res = await getSubCategoryByParent(id);
      setSubs(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      title: title,
      description: description,
      price: price,
      category: category,
      subCategory: subCategories,
      quantity: quantity,
      sold: sold,
      images: images,
      veg: veg,
    };
    try {
      setLoading(true);
      const res = await createProduct(user.token, values);
      console.log(res.data.data);
      toast.success(`${res.data.data.title} created successfully.`);
      history.push("/admin/products");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="pb-4">
      <AdminSideNav />
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div
          className="d-flex flex-column align-items-center "
          style={{ gap: "15px" }}
        >
          <h2 className="my-3">Add Product</h2>
          <form
            onSubmit={handleSubmit}
            className="border p-5 overflow-auto"
            style={{ width: "60%", boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)" }}
          >
            <div className="mb-3">
              <label className="form-label">Title : </label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter the product name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description : </label>
              <textarea
                className="form-control"
                required
                placeholder="Enter details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Price : </label>
              <input
                type="number"
                className="form-control"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Veg: </label>
              <select
                className="form-control"
                value={veg}
                onChange={(e) => setVeg(e.target.value)}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
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
            {subs.length > 0 && (
              <div className="mb-3">
                <label className="form-label">Sub Category</label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  value={subCategories}
                  onChange={(value) => setSubCategories(value)}
                  placeholder="Select Sub-category"
                >
                  {subs.map((s) => {
                    return (
                      <Option value={s._id} key={s._id}>
                        {s.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Quantity : </label>
              <input
                type="number"
                className="form-control"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter total no. of available product"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Sold : </label>
              <input
                type="number"
                className="form-control"
                required
                value={sold}
                onChange={(e) => setSold(e.target.value)}
                placeholder="Enter total no. of sold product"
              />
            </div>
            <div className="mb-3">
              <CloudinaryUpload images={images} setImages={setImages} />
            </div>
            <button
              className="btn btn-raised text-white btn-block"
              style={{ background: "#f16121" }}
            >
              ADD
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Product);
