import React, { useEffect, useState } from 'react'
import { getBoards, loadGame, newGame } from 'minesweeper-api-client'
import SelectGame from './SelectGame'

import './styles.scss'

const Container = ({ token, setBoard, showError }) => {
  const [boards, setBoards] = useState([])
  const [height, setHeight] = useState(6)
  const [width, setWidth] = useState(7)
  const [mines, setMines] = useState(8)

  const [heightValidationError, setHeightValidationError] = useState(false)
  const [widthValidationError, setWidthValidationError] = useState(false)
  const [minesValidationError, setMinesValidationError] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadGames = async () => {
    const { loadedBoards, message } = await getBoards({ token })

    if (loadedBoards) {
      setBoards(loadedBoards)
    } else {
      showError(message)
    }
  }

  useEffect(() => {
    loadGames().then(() => {})
  }, [])

  const onHeightChange = (e) => setHeight(e.target.value)
  const onWidthChange = (e) => setWidth(e.target.value)
  const onMinesChange = (e) => setMines(e.target.value)

  const onOpenModal = () => setIsModalOpen(true)
  const onCloseModal = () => setIsModalOpen(false)

  const onNewGame = async () => {
    const { board, message, errors } = await newGame({ token, height, width, mines })

    if (board) {
      setBoard(board)
    } else if (errors) {
      if (errors.mines) {
        setMinesValidationError(true)

        showError(errors.mines[0])
      }

      if (errors.width) {
        setWidthValidationError(true)

        showError(errors.width[0])
      }

      if (errors.height) {
        setHeightValidationError(true)

        showError(errors.height[0])
      }
    } else {
      showError(message)
    }
  }

  const onLoadGame = async (boardId) => {
    const { loadedBoard, message } = await loadGame({ token, boardId })

    if (loadedBoard) {
      setBoard(loadedBoard)
    } else {
      showError(message)
    }
  }

  const fields = {
    height: {
      label: 'Rows',
      type: 'number',
      value: height,
      placeholder: '# of rows',
      onChange: onHeightChange,
      error: heightValidationError
    },
    width: {
      label: 'Columns',
      type: 'number',
      value: width,
      placeholder: '# of columns',
      onChange: onWidthChange,
      error: widthValidationError
    },
    mines: {
      label: 'Mines',
      type: 'number',
      value: mines,
      placeholder: '# of mines',
      onChange: onMinesChange,
      error: minesValidationError
    }
  }

  return <SelectGame {...{ boards, onNewGame, onLoadGame, isModalOpen, onOpenModal, onCloseModal, fields }}/>
}

export default Container
