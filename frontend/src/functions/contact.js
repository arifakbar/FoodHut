import axios from "axios";

export const getContacts = async (authToken) => {
  return await axios.get("/api/contacts", {
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
    "/api/contact",
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
  return await axios.delete("/api/contact/" + contactId, {
    headers: {
      authToken: authToken,
    },
  });
};
