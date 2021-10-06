import axios from "axios";

export const createProduct = async (authToken, product) => {
  return await axios.post(process.env.REACT_APP_API + "/product/", product, {
    headers: { authToken: authToken },
  });
};

export const getAllProducts = async () => {
  return await axios.get(process.env.REACT_APP_API + "/products");
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
