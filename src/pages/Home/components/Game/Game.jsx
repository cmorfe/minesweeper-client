import React from "react";
import {Square} from '../'
import {Button} from "@material-ui/core";

const Game = ({token, board, time, loadBoard, message, setSquare, onBack}) => (
  <div className={'game'}>
    <div className={'information'}>
      <Button onClick={onBack}>
        Back
      </Button>
      <div className={'message'}>{message}</div>
      <div className={'timer'}>
        {`Time: ${time}`}
      </div>
    </div>
    <div className={'content'}>
      <div className={'board'}>
        {
          board.gameSquares.map((squareRow, i) => (
            <div className={'squareRow'} key={i}>
              {
                squareRow.map((square, j) => (
                  <Square key={`${i}-${j}`} {...{token, square, loadBoard, setSquare, boardId: board.id}} />
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  </div>
)

export default Game;