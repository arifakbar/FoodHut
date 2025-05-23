import axios from "axios";

export const getAllReservations = async (authToken) => {
  return await axios.get("/api/reservations", {
    headers: {
      authToken: authToken,
    },
  });
};

export const getUserReservations = async (authToken, id) => {
  return await axios.get("/api/user/reservation/" + id, {
    headers: { authToken: authToken },
  });
};

export const bookReservation = async (authToken, reservationBody) => {
  return await axios.post("/api/reservation", reservationBody, {
    headers: { authToken: authToken },
  });
};

export const updateReservationStatus = async (
  authToken,
  reservationId,
  status
) => {
  return await axios.put(
    "/api/reservation/" + reservationId,
    { status: status },
    { headers: { authToken: authToken } }
  );
};

export const deleteReservation = async (authToken, reservationId) => {
  return await axios.delete("/api/reservation/" + reservationId, {
    headers: { authToken: authToken },
  });
};
