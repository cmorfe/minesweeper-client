import axios from 'axios'
import { ROUTES } from '../../../constants'

export const newGame = ({ token, height, width, mines }) =>
  axios
    .post(ROUTES.NEW_GAME, { height, width, mines }, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => ({ board: response.data.data }))
    .catch(error => ({ errorMsg: error.toJSON().message }))

export const loadGame = ({ token, boardId }) =>
  axios
    .get(ROUTES.LOAD_GAME(boardId), { headers: { Authorization: `Bearer ${token}` } })
    .then(response => ({ loadedBoard: response.data.data }))
    .catch(error => ({ errorMsg: error.toJSON().message }))

export const saveGame = ({ token, boardId, time }) =>
  axios
    .put(ROUTES.SAVE_GAME(boardId), { time }, { headers: { Authorization: `Bearer ${token}` } })
    .catch(error => ({ errorMsg: error.toJSON().message }))

export const getBoards = ({ token }) =>
  axios
    .get(ROUTES.LOAD_GAMES, { headers: { Authorization: `Bearer  ${token}` } })
    .then(response => ({ loadedBoards: response.data.data }))
    .catch(error => ({ errorMsg: error.toJSON().message }))

export const markSquare = ({ token, boardId, squareId }) =>
  axios
    .post(ROUTES.MARK_SQUARE(boardId, squareId), {}, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => ({ loadedSquare: response.data.data }))
    .catch(error => ({ errorMsg: error.toJSON().message }))

export const openSquare = ({ token, boardId, squareId }) =>
  axios
    .post(ROUTES.OPEN_SQUARE(boardId, squareId), {}, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => ({ loadedSquare: response.data.data }))
    .catch(error => ({ errorMsg: error.toJSON().message }))
