const {API_URL} = process.env;

export const ROUTES = {
    REGISTER: `${API_URL}/signin`,
    LOGIN: `${API_URL}/login`,
    NEW_GAME: `${API_URL}/boards`,
    LOAD_GAME: (id) => `${API_URL}/boards/${id}`,
    SAVE_GAME: (id) => `${API_URL}/boards/${id}`,
    LOAD_GAMES: `${API_URL}/boards`,
    MARK_SQUARE: (boardId, squareId) => `${API_URL}/boards/${boardId}/squares/${squareId}/mark`,
    OPEN_SQUARE: (boardId, squareId) => `${API_URL}/boards/${boardId}/squares/${squareId}/open`,
};