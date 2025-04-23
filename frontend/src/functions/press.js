import axios from "axios";

export const allNews = async () => {
  return await axios.get("/api/news");
};

export const singleNews = async (id) => {
  return await axios.get("/api/news/" + id);
};

export const newNews = async (authToken, title, content) => {
  return await axios.post(
    "/api/news",
    {
      title,
      content,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const updateNews = async (authToken, id, title, content) => {
  return await axios.put(
    "/api/news/" + id,
    {
      title,
      content,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const deleteNews = async (authToken, id) => {
  return await axios.delete("/api/news/" + id, {
    headers: {
      authToken: authToken,
    },
  });
};
