import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { connect } from "react-redux";
import { Card } from "antd";
import axios from "axios";

import AdminSideNav from "../../components/adminSideNav";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../functions/product";

const { Meta } = Card;

function Products(props) {
  const { user } = props;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getAllProducts(10);
      setProducts(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  const handleDelete = async (p) => {
    // p.images[0].public_id
    if (window.confirm(`Do you really want to delete ${p.title} product ?`)) {
      setLoading(true);
      try {
        p.images &&
          p.images.map(async (i) => {
            await axios.post(
              process.env.REACT_APP_API + "/deleteImages",
              { public_id: i.public_id },
              {
                headers: {
                  authToken: user.token,
                },
              }
            );
          });
        const res = await deleteProduct(user.token, p._id);
        if (res.data.ok) {
          setLoading(false);
          toast.success(`${p.title} product deleted successfully`);
          loadProducts();
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="">
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
          <h2 className="my-2">Products</h2>
          <div className="row p-2" style={{ width: "80%" }}>
            {products.length > 0 &&
              products.map((p) => {
                return (
                  <div className=" col-sm-3" key={p._id}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt="example"
                          src={p.images && p.images[0].url}
                          style={{ height: "260px", objectFit: "fill" }}
                        />
                      }
                      actions={[
                        <Link to={`/edit-product/${p._id}`}>
                          <div className="btn btn-raised btn-primary">Edit</div>
                        </Link>,
                        <button
                          className="btn btn-raised btn-danger"
                          onClick={() => {
                            handleDelete(p);
                          }}
                        >
                          Delete
                        </button>,
                      ]}
                    >
                      <Meta
                        title={p.title}
                        description={`${
                          p.description && p.description.substring(0, 30)
                        }...`}
                      />
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Products);
