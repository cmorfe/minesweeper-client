import React, { useEffect } from 'react'
import { markSquare, openSquare } from 'minesweeper-api-client'
import Square from './Square'
import classnames from 'classnames'
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh'
import FlagIcon from '@material-ui/icons/Flag'

import './styles.scss'

const Container = ({ token, boardId, square, loadBoard, setSquare }) => {
  const getClasses = () => (classnames({
    square: true,
    open: square.open,
    mined: square.mined,
    one: square.adjacent_mines_count === 1,
    two: square.adjacent_mines_count === 2,
    three: square.adjacent_mines_count === 3,
    four: square.adjacent_mines_count === 4,
    five: square.adjacent_mines_count === 5,
    six: square.adjacent_mines_count === 6,
    seven: square.adjacent_mines_count === 7,
    eight: square.adjacent_mines_count === 8,
    flag: square.mark === 'FLAG'
  }))

  const display = () => {
    if (square.mark === 'FLAG') {
      return <FlagIcon/>
    }

    if (square.mark === 'QUESTION' && !square.open) {
      return <span>?</span>
    }

    if (square.mined) {
      return <BrightnessHighIcon/>
    }

    if (square.adjacent_mines_count > 0) {
      return <span>{square.adjacent_mines_count}</span>
    }
  }

  const onMarked = async (e) => {
    e.preventDefault()

    const { loadedSquare } = await markSquare({ token, boardId, squareId: square.id })

    if (loadedSquare) {
      setSquare(loadedSquare)
    }
  }

  useEffect(() => {
    const node = document.getElementById(`square-${square.id}`)
    if (node) {
      node.addEventListener('contextmenu', onMarked)
    }

    return () => {
      const node = document.getElementById(`square-${square.id}`)
      if (node) {
        node.removeEventListener('contextmenu', onMarked)
      }
    }
  })

  const onOpened = async () => {
    const { loadedSquare } = await openSquare({ token, boardId, squareId: square.id })

    if (loadedSquare) {
      if (loadedSquare.should_reload) {
        loadBoard()
      } else {
        setSquare(loadedSquare)
      }
    }
  }

  return <Square {...{ id: `square-${square.id}`, display: display(), onMarked, onOpened, classes: getClasses() }} />
}

export default Container
