import React, { FunctionComponent, useState } from "react"

import { MemoryGame } from "../momory-game/memory-game"

import styles from "./Gameboard.module.scss"
import { Card, CardId } from "./Card"

interface GameboardProps {
  game: MemoryGame
}

export const Gameboard: FunctionComponent<GameboardProps> = ({ game }) => {
  const [turnedCards, setTurnedCards] = useState<number[]>([])
  const [clearedCards, setClearedCards] = useState<number[]>([])

  const flipCard = (index: number) => {
    game.selectByIndex(index)

    const selectedIndexes = game.getSelectedIndexes()
    setTurnedCards([...selectedIndexes])

    const clearedIndexes = game.getClearedIndexes()
    setClearedCards([...clearedIndexes])
  }

  const isCardFlipped = (index: CardId) => turnedCards.includes(index)
  const isCardCleared = (index: CardId) => clearedCards.includes(index)

  const oncCardClick = (index: CardId) => {
    if (isCardFlipped(index)) return
    flipCard(index)
  }

  return (
    <div className={styles.wrapper}>
      {game.getCardIds().map((cardId, index) => {
        return (
          <Card
            id={cardId}
            onClick={() => oncCardClick(index)}
            key={`${cardId}${index}`}
            isFlipped={isCardFlipped(index)}
            isCleared={isCardCleared(index)}
          />
        )
      })}
    </div>
  )
}
