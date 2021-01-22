import React from "react";
import AddIcon from '@material-ui/icons/Add';
import "./BoardButton.scss";

const BoardButton = ({board, onLoadGame, onOpenModal}) => (
  <div className={'boardButton'}>
    {
      !board
      ? <NewGame {...{onOpenModal}} />
      : <LoadGame {...{board, onLoadGame}} />
    }
  </div>
)

const NewGame = ({onOpenModal}) => (
  <div className={'buttonContent'} onClick={onOpenModal}>
    <AddIcon />
  </div>
);

const LoadGame = ({board, onLoadGame}) => (
  <div className={'buttonContent'} onClick={() => onLoadGame(board.id)}>
    <span>{`${board.length} x ${board.height} board`}</span>
    <span>{`Mines: ${board.mines}`}</span>
    <span>{`Time: ${board.time}`}</span>
  </div>
);

export default BoardButton;
