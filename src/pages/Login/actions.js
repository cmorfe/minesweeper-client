import axios from "axios";
import { ROUTES } from "../../constants";

export const login = ({ username, password }) => {
  return axios
    .post(ROUTES.LOGIN, { username, password })
    .then((response) => response.headers)
    .then((headers) => {
      return { token: headers.authorization };
    })
    .catch((error) => ({ errorMsg: 'Invalid credentials.' }));
};
