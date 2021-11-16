import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";

import history from "../../history";
import { updateNews, singleNews } from "../../functions/press";

function EditPress(props) {
  const { user } = props;
  const { id } = props.match.params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const res = await singleNews(id);
      setTitle(res.data.data[0].title);
      setContent(res.data.data[0].content);
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
      const res = await updateNews(user.token, id, title, content);
      toast.success(`${res.data.data.name} press updated successfully.`);
      setLoading(false);
      history.push("/admin/press");
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
          <h4 className="text-center mb-3">EDIT PRESS</h4>
          <div className="mb-3">
            <label className="form-label">Title: </label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter new title "
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content: </label>
            <input
              type="text"
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Enter new content "
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

export default connect(mapStateToProps)(EditPress);
