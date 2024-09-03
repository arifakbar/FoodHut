import axios from "axios";

export const allNews = async () => {
  return await axios.get(process.env.REACT_APP_API + "/news");
};

export const singleNews = async (id) => {
  return await axios.get(process.env.REACT_APP_API + "/news/" + id);
};

export const newNews = async (authToken, title, content) => {
  return await axios.post(
    process.env.REACT_APP_API + "/news",
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
    process.env.REACT_APP_API + "/news/" + id,
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
  return await axios.delete(process.env.REACT_APP_API + "/news/" + id, {
    headers: {
      authToken: authToken,
    },
  });
};
