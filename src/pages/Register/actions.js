import axios from "axios";
import { ROUTES } from "../../constants";

export const register = ({ username, password }) => {
  return axios
    .post(
      ROUTES.REGISTER,
      { username, password }
    )
    .then(() => ({ errorMsg: null }))
    .catch((error) => ({ errorMsg: error.toJSON().message }));
};
