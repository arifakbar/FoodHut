import axios from "axios";

export const getAllSubCategoris = async () => {
  return await axios.get("/api/sub-categories");
};

export const getSubCategory = async (slug) => {
  return await axios.get("/api/sub-category/" + slug);
};

export const addSubCategory = async (authToken, name, parent) => {
  return await axios.post(
    "/api/sub-category",
    {
      name: name,
      parent: parent,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const updateSubCategory = async (authToken, name, parent, slug) => {
  return await axios.put(
    "/api/sub-category/" + slug,
    {
      name: name,
      parent: parent,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const deleteSubCategory = async (authToken, slug) => {
  return await axios.delete("/api/sub-category/" + slug, {
    headers: { authToken: authToken },
  });
};

export const getSubCategoryByParent = async (id) => {
  return await axios.get("/api/sub-category-by-parent/" + id);
};
