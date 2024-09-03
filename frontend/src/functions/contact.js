import axios from "axios";

export const getContacts = async (authToken) => {
  return await axios.get(process.env.REACT_APP_API + "/contacts", {
    headers: { authToken: authToken },
  });
};

export const createContact = async (
  authToken,
  name,
  email,
  subject,
  message
) => {
  return await axios.post(
    process.env.REACT_APP_API + "/contact",
    {
      name,
      email,
      subject,
      message,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const deleteContact = async (authToken, contactId) => {
  return await axios.delete(
    process.env.REACT_APP_API + "/contact/" + contactId,
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};
