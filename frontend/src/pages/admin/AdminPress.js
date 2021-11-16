import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { Link } from "react-router-dom";

import AdminSideNav from "../../components/adminSideNav";
import { allNews, newNews, deleteNews } from "../../functions/press";
import LocalSearch from "../../components/forms/LocalSearch";

function AdminPress(props) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keyword, setKeyword] = useState("");
  const { user } = props;

  useEffect(() => {
    loadPress();
  }, []);

  const loadPress = async () => {
    setLoading(true);
    try {
      const res = await allNews();
      setNews(res.data.data);
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
      const res = await newNews(user.token, title, content);
      loadPress();
      toast.success(`${res.data.data.title} press posted successfully.`);
      setLoading(false);
      setTitle("");
      setContent("");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleDelete = async (p) => {
    if (
      window.confirm(`Do you really want to delete ${p.title} press ?`) === true
    ) {
      setLoading(true);
      try {
        const res = await deleteNews(user.token, p._id);
        if (res.data.ok) {
          toast.success(`${p.title} press deleted successfully.`);
          setLoading(false);
          loadPress();
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
      return c.title.toLowerCase().includes(keyword);
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
          <h2 className="">Add News</h2>
          <form
            className="border p-5 "
            style={{ width: "80%" }}
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content</label>
              <input
                type="text"
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <button
              className="btn btn-raised text-white btn-block"
              style={{ background: "#f16121" }}
            >
              Add
            </button>
          </form>
          <hr style={{ width: "80%" }} />
          <div style={{ width: "80%" }}>
            <div className="change-search d-flex align-items-center justify-content-between">
              <h4 className="text">All News</h4>
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            </div>
            <div>
              {news.length > 0 && (
                <ul className="list-group">
                  {news.filter(searchResults(keyword)).map((p) => {
                    return (
                      <li
                        className="list-group-item border-1 d-flex justify-content-between align-items-center my-1 px-2"
                        key={p._id}
                      >
                        {p.title}
                        <div className="d-flex" style={{ gap: "5px" }}>
                          <Link
                            className="btn btn-raised btn-primary"
                            to={`/edit-press/${p._id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-raised btn-danger"
                            onClick={() => handleDelete(p)}
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

export default connect(mapStateToProps)(AdminPress);
