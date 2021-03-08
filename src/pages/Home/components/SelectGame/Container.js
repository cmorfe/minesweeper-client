import React, { useEffect, useState } from 'react'
import { getBoards, loadGame, newGame } from '../actions'
import SelectGame from './SelectGame'

import './styles.scss'

const Container = ({ token, setBoard, showError }) => {
  const [boards, setBoards] = useState([])
  const [height, setHeight] = useState(10)
  const [width, setWidth] = useState(10)
  const [mines, setMines] = useState(20)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadGames = async () => {
    const { loadedBoards, errorMsg } = await getBoards({ token })

    if (loadedBoards) {
      setBoards(loadedBoards)
    } else {
      showError(errorMsg)
    }
  }

  useEffect(() => {
    loadGames()
  }, [])

  const onHeightChange = (e) => setHeight(e.target.value)
  const onWidthChange = (e) => setWidth(e.target.value)
  const onMinesChange = (e) => setMines(e.target.value)

  const onOpenModal = () => setIsModalOpen(true)
  const onCloseModal = () => setIsModalOpen(false)

  const validateFields = () => {
    if (height < 2) {
      showError('Number of rows must be at least 2.')
      return false
    }

    if (height > 20) {
      showError('Number of rows must be less than 20.')
      return false
    }

    if (width < 2) {
      showError('Number of columns must be at least 2.')
      return false
    }

    if (width > 20) {
      showError('Number of columns must be less than 20.')
      return false
    }

    if (mines < 2) {
      showError('Number of mines must be at least 2.')
      return false
    }

    if (mines >= height * width) {
      showError(`Number of mines must be less than ${height * width}.`)
      return false
    }

    return true
  }

  const onNewGame = async () => {
    if (!validateFields()) {
      return
    }

    const { board, errorMsg } = await newGame({ token, height, width, mines })

    if (board) {
      setBoard(board)
    } else {
      showError(errorMsg)
    }
  }

  const onLoadGame = async (boardId) => {
    const { loadedBoard, errorMsg } = await loadGame({ token, boardId })

    if (loadedBoard) {
      setBoard(loadedBoard)
    } else {
      showError(errorMsg)
    }
  }

  const fields = {
    height: {
      label: 'Rows',
      type: 'number',
      value: height,
      placeholder: '# of rows',
      onChange: onHeightChange
    },
    width: {
      label: 'Columns',
      type: 'number',
      value: width,
      placeholder: '# of columns',
      onChange: onWidthChange
    },
    mines: {
      label: 'Mines',
      type: 'number',
      value: mines,
      placeholder: '# of mines',
      onChange: onMinesChange
    }
  }

  return <SelectGame {...{ boards, onNewGame, onLoadGame, isModalOpen, onOpenModal, onCloseModal, fields }}/>
}

export default Container
