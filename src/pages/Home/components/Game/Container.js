import React, { useEffect, useState } from 'react'
import { loadGame, saveGame } from 'minesweeper-api-client'
import Game from './Game'

import './styles.scss'

const Container = ({ token, board, setBoard, showError }) => {
  const [time, setTime] = useState(board.time)
  const [isRunning, setIsRunning] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let interval = null

    if (isRunning) {
      interval = setInterval(() => {
        setTime(time + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isRunning, time])

  const saveBoard = async () => {
    const { message, errors } = await saveGame({ token, time, boardId: board.id })

    if (errors) {
      showError(errors.time[0])
    } else if (message) {
      showError(message)
    }
  }

  const loadBoard = async () => {
    const { loadedBoard, message } = await loadGame({ token, boardId: board.id })

    if (message) {
      showError(message)
    } else {
      setBoard(loadedBoard)

      if (loadedBoard.game_state !== 'ON') {
        setIsRunning(false)

        await saveBoard()

        setMessage(`You have ${loadedBoard.game_state} this game!`)
      }
    }
  }

  const setSquare = (square) => {
    const squares = [...board.game_squares]

    squares[square.y][square.x] = square

    setBoard({
      ...board,
      game_squares: squares
    })
  }

  const onBack = async () => {
    await saveBoard()

    setBoard(null)
  }

  return <Game {...{ token, board, time, loadBoard, message, setSquare, onBack }} />
}

export default Container
