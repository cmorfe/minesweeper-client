import React, {useEffect} from "react";
import {openSquare, markSquare} from "../actions";
import Square from "./Square"

import "./styles.scss";

const Container = ({token, boardId, square, loadBoard, setSquare}) => {
  const display = () => {
    if (square.open) {
      if (square.mined) {
        return '*';
      } else {
        return square.adjacents;
      }
    } else {
      if (square.mined && square.mark !== 'FLAG') {
        return '*';
      } else {
        switch (square.mark) {
          case 'FLAG':
            return 'F';
          case 'QUESTION':
            return '?';
          default:
            return 'X';
        }
      }
    }
  }

  useEffect(() => {
    const node = document.getElementById(`square-${square.id}`);
    if (node) {
      node.addEventListener('contextmenu', onMarked);
    }

    return () => {
      const node = document.getElementById(`square-${square.id}`);
      if (node) {
        node.removeEventListener('contextmenu', onMarked);
      }
    }
  })

  const onMarked = async (e) => {
    e.preventDefault();

    const {loadedSquare, errorMsg} = await markSquare({token, boardId, squareId: square.id});

    if (loadedSquare) {
        setSquare(loadedSquare);
    }
  }

  const onOpened = async () => {
    const {loadedSquare, errorMsg} = await openSquare({token, boardId, squareId: square.id});

    if (loadedSquare) {
      if (loadedSquare.shouldReload) {
        loadBoard();
      } else {
        setSquare(loadedSquare);
      }
    }
  }

  return <Square {...{id: `square-${square.id}`, display: display(), onMarked, onOpened}} />
}

export default Container;