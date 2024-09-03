import axios from "axios";

export const getAllCategories = async () => {
  return await axios.get(process.env.REACT_APP_API + "/categories");
};

export const getCategory = async (slug) => {
  return await axios.get(process.env.REACT_APP_API + "/category/" + slug);
};

export const addCategory = async (authToken, name) => {
  return await axios.post(
    process.env.REACT_APP_API + "/category",
    {
      name: name,
    },
    { headers: { authToken: authToken } }
  );
};

export const updateCategory = async (authToken, category, slug) => {
  return await axios.put(
    process.env.REACT_APP_API + "/category/" + slug,
    category,
    {
      headers: { authToken: authToken },
    }
  );
};

export const deleteCategory = async (authToken, slug) => {
  return await axios.delete(process.env.REACT_APP_API + "/category/" + slug, {
    headers: {
      authToken: authToken,
    },
  });
};
