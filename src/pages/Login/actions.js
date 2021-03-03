import axios from "axios";
import { ROUTES } from "../../constants";

export const login = ({ username, password }) => {
  return axios
    .post(ROUTES.LOGIN, { username, password })
    .then((response) => response.data.data)
    .then((data) => {
      return { token: data.access_token };
    })
    .catch((error) => ({ errorMsg: 'Invalid credentials.' }));
};
