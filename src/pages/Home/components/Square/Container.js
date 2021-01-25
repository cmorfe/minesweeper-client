import React, {useEffect} from "react";
import {openSquare, markSquare} from "../actions";
import Square from "./Square";
import classnames from 'classnames';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import FlagIcon from '@material-ui/icons/Flag';

import "./styles.scss";

const Container = ({token, boardId, square, loadBoard, setSquare}) => {
  const getClasses = () => (classnames({
    square: true,
    open: square.open,
    mined: square.mined,
    one: square.adjacents === 1,
    two: square.adjacents === 2,
    three: square.adjacents === 3,
    four: square.adjacents === 4,
    five: square.adjacents === 5,
    six: square.adjacents === 6,
    seven: square.adjacents === 7,
    eight: square.adjacents === 8,
    flag: square.mark === 'FLAG'
  }))

  const display = () => {
    if (square.mark === 'FLAG') {
      return <FlagIcon />
    }

    if (square.mark === 'QUESTION' && !square.open) {
      return <span>?</span>
    }

    if (square.mined) {
      return <BrightnessHighIcon />
    }

    if (square.adjacents > 0) {
      return <span>{square.adjacents}</span>
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

  return <Square {...{id: `square-${square.id}`, display: display(), onMarked, onOpened, classes: getClasses()}} />
}

export default Container;