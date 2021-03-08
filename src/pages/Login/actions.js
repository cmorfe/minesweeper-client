import axios from 'axios'
import { ROUTES } from '../../constants'

export const login = ({ username, password }) =>
  axios
    .post(ROUTES.LOGIN, { username, password })
    .then(response => ({ token: response.data.data.access_token }))
    .catch(() => ({ errorMsg: 'Invalid credentials.' }))
