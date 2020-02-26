import React, { useState, useEffect } from "react"

import { MemoryGame, MemoryCard } from "../memory-game/memory-game"

import styles from "./Gameboard.module.scss"
import { Card } from "./Card"

interface GameboardProps {
  game: MemoryGame
}

export const Gameboard = (props: GameboardProps) => {
  const { game } = props

  const [movesCount, setMovesCount] = useState(0)

  const nextMove = (card: MemoryCard) => {
    setMovesCount(movesCount + 1)
    game.onFlipCard(card)
  }

  return (
    <div className={styles.wrapper}>
      {game.getCards().map(card => {
        return (
          <Card
            id={card.id}
            onClick={() => nextMove(card)}
            key={`${card.id}${card.position}`}
            isFlipped={game.isCardFlipped(card)}
            isCleared={game.isCardCleared(card)}
          />
        )
      })}
    </div>
  )
}
