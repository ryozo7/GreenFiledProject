import axiosClient from "./axiosClient";

const historyApi = {
  getAll: () => axiosClient.get("histories"),
  getByUser: (username) => axiosClient.get(`histories/${username}`),
  createHistory: (username, sendData) =>
    axiosClient.post(
      //   `histories/${username.split(" ")[0]} ${username.split(" ")[1]}`,
      `histories/${username}`,
      sendData
    ),
};

export default historyApi;