import axios from "axios";
import {ROUTES} from "../../constants";

export const register = ({username, password, validation}) => {
  return axios
    .post(ROUTES.REGISTER, {username, password, password_confirmation: validation})
    .then((response) => response.data.data)
    .then((data) => ({token: data.access_token}))
    .catch((error) => ({errorMsg: error.response ? error.response.data.message : error.toJSON().message}));
};
