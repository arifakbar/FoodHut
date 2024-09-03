import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { toast } from "react-toastify";

import balckBg1 from "../images/block-bg-1.png";
import balckBg2 from "../images/block-bg-2.png";
import image from "../images/menu-ff-pizza.jpg";
import Footer from "../components/footer";

import { allNews } from "../functions/press";

function Press() {
  const [press, setPress] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const res = await allNews();
      setPress(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div style={{ height: "97vh" }}>
        <div className="press-banner"></div>
      </div>
      <div className="container-fluid position-relative reservation-container">
        <img
          src={balckBg1}
          alt="NF"
          style={{ position: "absolute", top: "-21%", right: "0" }}
        />
        <img
          src={balckBg2}
          alt="NF"
          style={{ position: "absolute", top: "30%", left: "0" }}
        />
        <div className="reservation-heading">
          <hr />
          <h3 className="m-0">NEWS</h3>
          <hr />
        </div>
      </div>
      <div className="press-container">
        <div className="press-img">
          <img src={image} alt="NF" />
        </div>
        <div className="press-info">
          {press &&
            press.map((p) => {
              return (
                <div className="press-news" key={p._id}>
                  <p>Posted on {new Date(p.createdAt).toDateString()}</p>
                  <h3>{p.title}</h3>
                  <p>{p.content.substring(50)}...</p>
                  <a href="">Read More</a>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Press;
