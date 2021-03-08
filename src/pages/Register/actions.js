import axios from 'axios'
import { ROUTES } from '../../constants'

export const register = ({ username, password, password_confirmation }) =>
  axios
    .post(ROUTES.REGISTER, { username, password, password_confirmation })
    .then(response => ({ token: response.data.data.access_token }))
    .catch(error => ({ errorMsg: error.response ? error.response.data.message : error.toJSON().message }))
