import React from 'react'
import { BoardButton } from '../'
import { Button, Modal, TextField } from '@material-ui/core'

const SelectGame = ({ boards, onNewGame, onLoadGame, isModalOpen, onOpenModal, onCloseModal, fields }) => (
  <div className={'select-game'}>
    <div className={'new-game-section'}>
      <BoardButton {...{ onNewGame, onOpenModal }} />
    </div>

    <div className={'load-games-section'}>
      {
        boards.length > 0 && <h3>{'Saved Games'}</h3>
      }
      <div className={'saved-games'}>
        {
          boards.map(board => (
            <BoardButton key={board.id} {...{ board, onLoadGame }} />
          ))
        }
      </div>
    </div>

    <Modal
      open={isModalOpen}
      onClose={onCloseModal}
    >
      <div className={'newGameModal'}>
        <div className={'fields'}>
          <TextField {...fields.height} variant={'outlined'}/>
          <TextField {...fields.width} variant={'outlined'}/>
          <TextField {...fields.mines} variant={'outlined'}/>
        </div>
        <div className={'buttons'}>
          <Button color={'primary'} onClick={onNewGame}>
            Create
          </Button>
          <Button onClick={onCloseModal}>
            Cancel
          </Button>

        </div>
      </div>
    </Modal>
  </div>
)

export default SelectGame
