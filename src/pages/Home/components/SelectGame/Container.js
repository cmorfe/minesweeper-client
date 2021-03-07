import React, {useEffect, useState} from "react";
import {getBoards, loadGame, newGame} from "../actions";
import SelectGame from "./SelectGame";

import "./styles.scss";

const Container = ({token, setBoard, showError}) => {
  const [boards, setBoards] = useState([]);
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [mines, setMines] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadGames = async () => {
    const {loadedBoards, errorMsg} = await getBoards({token});

    if (loadedBoards) {
      setBoards(loadedBoards);
    } else {
      showError(errorMsg);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  const onRowsChange = (e) => setRows(e.target.value);
  const onColumnsChange = (e) => setColumns(e.target.value);
  const onMinesChange = (e) => setMines(e.target.value);

  const onOpenModal = () => setIsModalOpen(true);
  const onCloseModal = () => setIsModalOpen(false);

  const validateFields = () => {
    if (rows < 2) {
      showError("Number of rows must be at least 2.");
      return false;
    }

    if (rows > 20) {
      showError("Number of rows must be less than 20.");
      return false;
    }

    if (columns < 2) {
      showError("Number of columns must be at least 2.");
      return false;
    }

    if (columns > 20) {
      showError("Number of columns must be less than 20.");
      return false;
    }

    if (mines < 2) {
      showError("Number of mines must be at least 2.");
      return false;
    }

    if (mines >= rows * columns) {
      showError(`Number of mines must be less than ${rows * columns}.`);
      return false;
    }

    return true;
  };

  const onNewGame = async () => {
    if (!validateFields()) {
      return;
    }

    const {board, errorMsg} = await newGame({token, rows, columns, mines});

    if (board) {
      setBoard(board);
    } else {
      showError(errorMsg);
    }
  };

  const onLoadGame = async (boardId) => {
    const {loadedBoard, errorMsg} = await loadGame({token, boardId});

    if (loadedBoard) {
      setBoard(loadedBoard);
    } else {
      showError(errorMsg);
    }
  };

  const fields = {
    rows: {
      label: "Rows",
      type: "number",
      value: rows,
      placeholder: "# of rows",
      onChange: onRowsChange
    },
    columns: {
      label: "Columns",
      type: "number",
      value: columns,
      placeholder: "# of columns",
      onChange: onColumnsChange
    },
    mines: {
      label: "Mines",
      type: "number",
      value: mines,
      placeholder: "# of mines",
      onChange: onMinesChange
    }
  };

  return <SelectGame {...{boards, onNewGame, onLoadGame, isModalOpen, onOpenModal, onCloseModal, fields}}/>;
};

export default Container;
