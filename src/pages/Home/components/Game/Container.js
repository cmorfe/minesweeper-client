import React, {useEffect, useState} from 'react';
import {loadGame, saveGame} from "../actions";
import Game from "./Game";

import "./styles.scss"

const Container = ({token, board, setBoard, showError}) => {
  const [time, setTime] = useState(board.time);
  const [isRunning, setIsRunning] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => { setTime(time + 1) }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const loadBoard = async () => {
    const {loadedBoard, errorMsg} = await loadGame({token, boardId:board.id});

    if (errorMsg) {
      showError(errorMsg);
    } else {
      setBoard(loadedBoard);
      if (loadedBoard.gameState !== "ON") {
        setIsRunning(false);
        saveBoard();

        setMessage(`You have ${loadedBoard.gameState} this game!`);
      }
    }
  }

  const saveBoard = async () => {
    const {errorMsg} = await saveGame({token, time, boardId: board.id});

    if (errorMsg) {
      showError(errorMsg);
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

  const onBack = () => {
    saveBoard().then(() => setBoard(null));
  }

  return <Game {...{token, board, time, loadBoard, message, setSquare, onBack}} />
};

export default Container;