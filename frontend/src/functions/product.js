import axios from "axios";

export const createProduct = async (authToken, product) => {
  return await axios.post(process.env.REACT_APP_API + "/product/", product, {
    headers: { authToken: authToken },
  });
};

export const getProductsByCount = async (count) => {
  return await axios.get(process.env.REACT_APP_API + "/products/" + count);
};

export const productsCount = async () => {
  return await axios.get(process.env.REACT_APP_API + "/products/total");
};

export const getAllProducts = async (sort, order, page) => {
  return await axios.post(process.env.REACT_APP_API + "/products", {
    sort,
    order,
    page,
  });
};

export const getProduct = async (productId) => {
  return await axios.get(process.env.REACT_APP_API + "/product/" + productId);
};

export const updateProduct = async (authToken, product, productId) => {
  return await axios.put(
    process.env.REACT_APP_API + "/product/" + productId,
    product,
    { headers: { authToken: authToken } }
  );
};

export const deleteProduct = async (authToken, productId) => {
  return await axios.delete(
    process.env.REACT_APP_API + "/product/" + productId,
    { headers: { authToken: authToken } }
  );
};

export const searchProduct = async (query) => {
  return await axios.post(process.env.REACT_APP_API + "/products/search", {
    query: query,
  });
};

export const relatedProducts = async (productId) => {
  return await axios.get(
    process.env.REACT_APP_API + "/product/related/" + productId
  );
};

export const productStar = async (authToken, star, productId) => {
  return await axios.post(
    process.env.REACT_APP_API + "/product/star/" + productId,
    {
      star: star,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const filterProducts = async (filter) => {
  return await axios.post(process.env.REACT_APP_API + "/filter/products", {
    filter,
  });
};

export const mostRated = async (type) => {
  return await axios.post(process.env.REACT_APP_API + "/most-rated", {
    type: type,
  });
};
