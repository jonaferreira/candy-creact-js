import React, { DragEvent, useEffect, useState, useCallback } from 'react'

import { Candy } from './Game.styled'

// import blueCandy from '../images/blue-candy.png'
// import greenCandy from '../images/green-candy.png'
// import orangeCandy from '../images/orange-candy.png'
// import purpleCandy from '../images/purple-candy.png'
// import redCandy from '../images/red-candy.png'
// import yellowCandy from '../images/yellow-candy.png'
// import blank from '../images/blank.png'

const width = 8
const blueCandy = '0, 0, 255'
const greenCandy = '0, 128, 0'
const orangeCandy = '255, 165, 0'
const purpleCandy = '128, 0, 128'
const redCandy = '128, 0, 128'
const yellowCandy = '255, 255, 0'
const blank = '0, 0, 0'

const candyColors = [blueCandy, orangeCandy, purpleCandy, redCandy, yellowCandy, greenCandy]

const generateRandomColorArrangement = (widthParam: number): string[] => {
  const randomColorArrangement: string[] = []
  for (let i = 0; i < widthParam * widthParam; i++) {
    const randomColor: string = candyColors[Math.floor(Math.random() * candyColors.length)]
    randomColorArrangement.push(randomColor)
  }
  return randomColorArrangement
}

interface ChildProps {
  setScoreDisplay: React.Dispatch<React.SetStateAction<number>>
}

function GameContainer({ setScoreDisplay }: ChildProps): React.ReactElement {
  const [currentColorArrangement, setCurrentColorArrangement] = useState<string[]>([])
  const [squareBeingDragged, setSquareBeingDragged] = useState<number>(0)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<number>(0)

  const checkForColumnOfFour = useCallback((): boolean => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if (
        columnOfFour.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)
      ) {
        setScoreDisplay((score) => score + 4)
        columnOfFour.forEach((square) => {
          currentColorArrangement[square] = blank
          return currentColorArrangement
        })
        return true
      }
    }
    return false
  }, [currentColorArrangement, setScoreDisplay])

  const checkForRowOfFour = useCallback(() => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArrangement[i]
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64,
      ]

      const isBlank = currentColorArrangement[i] === blank

      if (!notValid.includes(i)) {
        if (
          rowOfFour.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)
        ) {
          setScoreDisplay((score) => score + 4)
          rowOfFour.forEach((square) => {
            currentColorArrangement[square] = blank
            return currentColorArrangement
          })
          return true
        }
      }
    }
    return false
  }, [currentColorArrangement, setScoreDisplay])

  const checkForColumnOfThree = useCallback(() => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if (
        columnOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor && !isBlank,
        )
      ) {
        setScoreDisplay((score) => score + 3)
        columnOfThree.forEach((square) => {
          currentColorArrangement[square] = blank
          return true
        })
      }
    }
    return false
  }, [currentColorArrangement, setScoreDisplay])

  const checkForRowOfThree = useCallback(() => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const isBlank = currentColorArrangement[i] === blank

      if (!notValid.includes(i)) {
        if (
          rowOfThree.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)
        ) {
          setScoreDisplay((score) => score + 3)
          rowOfThree.forEach((square) => {
            currentColorArrangement[square] = blank
          })
          return true
        }
      }
    }
    return false
  }, [currentColorArrangement, setScoreDisplay])

  const moveIntoSquareBelow = useCallback(() => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColorArrangement[i] === blank) {
        const randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      }
      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = blank
      }
    }
  }, [currentColorArrangement])

  const handleDropBeing = (e: DragEvent, index: number): void => {
    setSquareBeingDragged(index)
  }

  const handleDropToRemplace = (e: DragEvent, index: number): void => {
    setSquareBeingReplaced(index)
  }

  const doDrag = (): void => {
    const srcDragged: string = currentColorArrangement[squareBeingDragged]
    const srcReplaced: string = currentColorArrangement[squareBeingReplaced]

    currentColorArrangement[squareBeingReplaced] = srcDragged
    currentColorArrangement[squareBeingDragged] = srcReplaced

    const validMoves = [
      squareBeingDragged - 1,
      squareBeingDragged - width,
      squareBeingDragged + 1,
      squareBeingDragged + width,
    ]

    const validMove = validMoves.includes(squareBeingReplaced)

    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if (
      squareBeingReplaced &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
    ) {
      setSquareBeingDragged(0)
      setSquareBeingReplaced(0)
    } else {
      currentColorArrangement[squareBeingReplaced] = srcReplaced
      currentColorArrangement[squareBeingDragged] = srcDragged
      setCurrentColorArrangement([...currentColorArrangement])
    }
  }

  const createBoard = (): void => {
    const randomColorArrangement: string[] = generateRandomColorArrangement(width)
    setCurrentColorArrangement(randomColorArrangement)
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)
  }, [
    checkForColumnOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    checkForRowOfFour,
    moveIntoSquareBelow,
    currentColorArrangement,
  ])

  return (
    <div className='game'>
      {currentColorArrangement.map((candyColor, index) => (
        <div
          className='candy'
          id={candyColor}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          data-id={index}
          draggable
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={(e) => handleDropToRemplace(e, index)}
          onDragEnd={() => doDrag()}
          onDragStart={(e) => handleDropBeing(e, index)}
        >
          <Candy color={candyColor} hasBorder />
        </div>
      ))}
    </div>
  )
}
export default GameContainer
