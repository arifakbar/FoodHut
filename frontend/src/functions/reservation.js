import axios from "axios";

export const getAllReservations = async (authToken) => {
  return await axios.get(process.env.REACT_APP_API + "/reservations", {
    headers: {
      authToken: authToken,
    },
  });
};

export const getUserReservations = async (authToken, id) => {
  return await axios.get(
    process.env.REACT_APP_API + "/user/reservation/" + id,
    {
      headers: { authToken: authToken },
    }
  );
};

export const bookReservation = async (authToken, reservationBody) => {
  return await axios.post(
    process.env.REACT_APP_API + "/reservation",
    reservationBody,
    {
      headers: { authToken: authToken },
    }
  );
};

export const updateReservationStatus = async (
  authToken,
  reservationId,
  status
) => {
  return await axios.put(
    process.env.REACT_APP_API + "/reservation/" + reservationId,
    { status: status },
    { headers: { authToken: authToken } }
  );
};

export const deleteReservation = async (authToken, reservationId) => {
  return await axios.delete(
    process.env.REACT_APP_API + "/reservation/" + reservationId,
    {
      headers: { authToken: authToken },
    }
  );
};
