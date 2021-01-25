import React from "react";
import AddIcon from '@material-ui/icons/Add';
import classnames from 'classnames';

import "./BoardButton.scss";

const BoardButton = ({board, onLoadGame, onOpenModal}) => (
  <div className={classnames({boardButton: true, 'new-game': !board})}>
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
    <span className={'text'}>{'New Game'}</span>
  </div>
);

const LoadGame = ({board, onLoadGame}) => (
  <div className={'buttonContent'} onClick={() => onLoadGame(board.id)}>
    <span>{`${board.length} x ${board.height}`}</span>
    <span>{`Mines: ${board.mines}`}</span>
    <span>{`Time: ${board.time}`}</span>
  </div>
);

export default BoardButton;
