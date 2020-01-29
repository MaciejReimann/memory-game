import React, { FunctionComponent, useState, useEffect } from "react"
import useEventListener from "@use-it/event-listener"

import styles from "./Gameboard.module.scss"
import { MemoryGame } from "../momory-game/memory-game"
import { Grid } from "./Grid"
import { Card, CardId } from "./Card"

const numberOfUniqueCards = 8

interface GameboardProps {
  socket: any
  game: MemoryGame
}

export const Gameboard: FunctionComponent<GameboardProps> = ({
  socket,
  game
}) => {
  const [turnedCards, setTurnedCards] = useState<number[]>([])
  const [clearedCards, setClearedCards] = useState<number[]>([])

  const turnCard = (index: number) => {
    game.selectByIndex(index)

    const selectedIndexes = game.getSelectedIndexes()
    setTurnedCards([...selectedIndexes])

    const clearedIndexes = game.getClearedIndexes()
    setClearedCards([...clearedIndexes])
  }

  const isCardTurned = (index: number) => turnedCards.includes(index)
  const isCardCleared = (index: number) => clearedCards.includes(index)

  const oncCardClick = (index: number) => {
    if (isCardTurned(index)) return
    turnCard(index)
  }

  return (
    <div className={styles.wrapper}>
      {game.getIds().map((id, index) => {
        return (
          <Card
            id={id}
            onClick={() => oncCardClick(index)}
            key={id.toString().concat(index.toString())}
            isTurned={isCardTurned(index)}
            isCleared={isCardCleared(index)}
          />
        )
      })}
    </div>
  )
}

// const useMouseMove = () => {
//   const [coords, setCoords] = useState([0, 0])

//   useEventListener("mousemove", (event: any): void => {
//     setCoords([event.clientX, event.clientY])

//     // socket.emit("mousemove", { x: event.clientX, y: event.clientY })
//   })

//   return coords
// }

// function useArray(): [CardId[], (id: number) => void, (id: number) => void] {
//   const [turnedCardsIds, setTurnedCardId] = useState<CardId[]>([])
//   const addTurnedCards = (cardId: CardId) =>
//     setTurnedCardId([...turnedCardsIds, cardId])

//   const removeTurnedCard = (cardId: CardId) =>
//     setTurnedCardId(turnedCardsIds.filter(id => id !== cardId))

//   return [turnedCardsIds, addTurnedCards, removeTurnedCard]
// }
