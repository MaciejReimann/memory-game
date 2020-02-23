import React, { FunctionComponent, useState } from "react"

import { MemoryGame, MemoryCard } from "../memory-game/memory-game"

import styles from "./Gameboard.module.scss"
import { Card } from "./Card"

interface GameboardProps {
  game: MemoryGame
}

export const Gameboard: FunctionComponent<GameboardProps> = ({ game }) => {
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [clearedCards, setClearedCards] = useState<number[]>([])

  const flipCard = (card: MemoryCard): void => {
    game.onFlipCard(card)

    const flippedCardsPositions = game
      .getFlippedCards()
      .map(card => card.position)
    setFlippedCards([...flippedCardsPositions])

    const clearedCardsPositions = game
      .getClearedCards()
      .map(card => card.position)
    setClearedCards([...clearedCardsPositions])
  }

  const isCardFlipped = (index: number) => flippedCards.includes(index)
  const isCardCleared = (index: number) => clearedCards.includes(index)

  const oncCardClick = (card: MemoryCard) => {
    if (isCardFlipped(card.position)) return
    flipCard(card)
  }

  return (
    <div className={styles.wrapper}>
      {game.getCards().map(card => {
        return (
          <Card
            id={card.id}
            onClick={() => oncCardClick(card)}
            key={`${card.id}${card.position}`}
            isFlipped={isCardFlipped(card.position)}
            isCleared={isCardCleared(card.position)}
          />
        )
      })}
    </div>
  )
}
