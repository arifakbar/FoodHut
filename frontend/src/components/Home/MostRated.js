import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { mostRated } from "../../functions/product";

function MostRated(props) {
  const { type } = props;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (req, res, next) => {
    try {
      const res = await mostRated(type);
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="most-rated">
      {products &&
        products.map((p) => {
          return (
            <div key={p._id} className="mr-div">
              <img
                src={p.images[0].url}
                style={{ height: "100%", width: "100%", objectFit: "fill" }}
              />
              <Link to={`/product/${p._id}`} className="mr-btn">
                View
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default MostRated;
