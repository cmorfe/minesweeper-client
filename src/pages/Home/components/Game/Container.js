import React, {useEffect, useState} from 'react';
import {loadGame} from "../actions";
import Game from "./Game";

import "./styles.scss"

const Container = ({token, board, setBoard, showError}) => {
  const [time, setTime] = useState(board.time);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  const loadBoard = async () => {
    const {loadedBoard, errorMsg} = await loadGame({token, boardId:board.id});

    if (errorMsg) {
      showError(errorMsg);
    } else {
      setBoard(loadedBoard);
    }
  }

  const setSquare = (square) => {
    let squares = [...board.gameSquares];
    squares[square.x][square.y] = square;

    setBoard({
      ...board,
      gameSquares: squares
    });
  }

  return <Game {...{token, board, time, loadBoard, message, setSquare}} />
};

export default Container;