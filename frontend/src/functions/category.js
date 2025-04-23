import axios from "axios";

export const getAllCategories = async () => {
  return await axios.get("/api/categories");
};

export const getCategory = async (slug) => {
  return await axios.get("/api/category/" + slug);
};

export const addCategory = async (authToken, name) => {
  return await axios.post(
    "/api/category",
    {
      name: name,
    },
    { headers: { authToken: authToken } }
  );
};

export const updateCategory = async (authToken, category, slug) => {
  return await axios.put("/api/category/" + slug, category, {
    headers: { authToken: authToken },
  });
};

export const deleteCategory = async (authToken, slug) => {
  return await axios.delete("/api/category/" + slug, {
    headers: {
      authToken: authToken,
    },
  });
};
