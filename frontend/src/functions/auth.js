import axios from "axios";
import history from "../history";

export const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    process.env.REACT_APP_API + "/create-or-update-user",
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const currentUser = async (authToken) => {
  return await axios.post(
    process.env.REACT_APP_API + "/current-user",
    {},
    {
      headers: { authToken: authToken },
    }
  );
};

export const currentAdmin = async (authToken) => {
  return await axios.post(
    process.env.REACT_APP_API + "/current-admin",
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const updateUsername = async (username, authToken) => {
  return await axios.post(
    process.env.REACT_APP_API + "/update-username",
    {
      username: username,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const sendOTP = async (authToken, number) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/sendOTP",
    {
      number: number,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const verifyOTP = async (authToken, number, OTP) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/verifyOTP",
    {
      number: number,
      OTP: OTP,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const roleBasedRedirect = (res) => {
  if (history.location.state) history.push(history.location.state.from);
  else {
    if (res.data.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  }
};
