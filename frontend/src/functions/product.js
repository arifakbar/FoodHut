import axios from "axios";

export const createProduct = async (authToken, product) => {
  return await axios.post("/api/product/", product, {
    headers: { authToken: authToken },
  });
};

export const getProductsByCount = async (count) => {
  return await axios.get("/api/products/" + count);
};

export const productsCount = async () => {
  return await axios.get("/api/products/total");
};

export const getAllProducts = async (sort, order, page) => {
  return await axios.post("/api/products", {
    sort,
    order,
    page,
  });
};

export const filterProducts = async (filter, page) => {
  return await axios.post("/api/filter/products", {
    filter,
    page,
  });
};

export const getProduct = async (productId) => {
  return await axios.get("/api/product/" + productId);
};

export const updateProduct = async (authToken, product, productId) => {
  return await axios.put("/api/product/" + productId, product, {
    headers: { authToken: authToken },
  });
};

export const deleteProduct = async (authToken, productId) => {
  return await axios.delete("/api/product/" + productId, {
    headers: { authToken: authToken },
  });
};

export const searchProduct = async (query) => {
  return await axios.post("/api/products/search", {
    query: query,
  });
};

export const relatedProducts = async (productId) => {
  return await axios.get("/api/product/related/" + productId);
};

export const productStar = async (authToken, star, productId) => {
  return await axios.post(
    "/api/product/star/" + productId,
    {
      star: star,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const mostRated = async (type) => {
  return await axios.post("/api/most-rated", {
    type: type,
  });
};
