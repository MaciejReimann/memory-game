import React, { FunctionComponent, useState, useEffect } from "react"
import useEventListener from "@use-it/event-listener"

import styles from "./Gameboard.module.scss"
import { Grid } from "./Grid"
import { Card, CardId } from "./Card"

const numberOfUniqueCards = 8

interface GameboardProps {
  game: any
}

export const Gameboard: FunctionComponent<GameboardProps> = ({ game }) => {
  useEffect(() => {
    game.onSelectCard(addTurnedCards)
  })
  const howManyCards = numberOfUniqueCards * 2

  function useArray(): [CardId[], (id: number) => void, (id: number) => void] {
    const [turnedCardsIds, setTurnedCardId] = useState<CardId[]>([])
    const addTurnedCards = (cardId: CardId) =>
      setTurnedCardId([...turnedCardsIds, cardId])

    const removeTurnedCard = (cardId: CardId) =>
      setTurnedCardId(turnedCardsIds.filter(id => id != cardId))

    return [turnedCardsIds, addTurnedCards, removeTurnedCard]
  }

  const [turnedCardsIds, addTurnedCards, removeTurnedCard] = useArray()

  const isCardTurned = (id: CardId) => turnedCardsIds.includes(id)

  const oncCardClick = (id: CardId) => {
    isCardTurned(id) ? removeTurnedCard(id) : addTurnedCards(id)
    game.selectCard(id)
    console.log(id)
  }

  const cards = [...Array(howManyCards).keys()].map((_, i) => (
    <Card id={i} onClick={oncCardClick} key={i} isTurned={isCardTurned(i)} />
  ))
  // create2DArray(3, 5, (x, y) => <Card id={[x, y]} onClick={}/>)

  return <div className={styles.wrapper}>{cards}</div>
}

// export function create2DArray(
//   rows: number,
//   columns: number,
//   fromIndexes: (x: number, y: number, args?: any[]) => any
// ) {
//   return [...Array(rows).keys()].map(row =>
//     [...Array(columns).keys()].map(column => fromIndexes(row, column))
//   )
// }

// const useMouseMove = () => {
//   const [coords, setCoords] = useState([0, 0])

//   useEventListener("mousemove", (event: any): void => {
//     setCoords([event.clientX, event.clientY])

//     // socket.emit("mousemove", { x: event.clientX, y: event.clientY })
//   })

//   return coords
// }
