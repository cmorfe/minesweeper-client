import axios from "axios";
import {ROUTES} from "../../constants";

export const register = ({username, password, validation}) => {
  return axios
    .post(
      ROUTES.REGISTER,
      {username, password, password_confirmation: validation}
    )
    .then(() => ({errorMsg: null}))
    .catch((error) => ({errorMsg: error.response ? error.response.data.message : error.toJSON().message}));
};
