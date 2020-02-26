import { shuffle } from "lodash"

export type MemoryCard = {
  position: number
  id: number
}
export type Player = string

export type MemoryGameConfig = {
  pairsCount: number
  players: Player[]
}

export class MemoryGame {
  readonly cards: MemoryCard[]
  readonly players: Player[]

  flippedCards: MemoryCard[] = []
  clearedCards: MemoryCard[] = []

  constructor(config: MemoryGameConfig) {
    this.cards = this.getMemoryCardsInRandomOrder(config.pairsCount)
    this.players = config.players
  }

  getCards(): MemoryCard[] {
    return this.cards
  }

  onFlipCard(card: MemoryCard): void {
    if (this.isCardFlipped(card)) return

    this.addToFlippedCards(card)

    if (this.isFirstCardFlipped()) return
    if (this.isSecondCardFlipped()) this.clearIfIsPair(card)
    else this.resetFlippedCards()
  }

  isCardFlipped(card: MemoryCard): boolean {
    return this.flippedCards.map(card => card.position).includes(card.position)
  }

  isCardCleared(card: MemoryCard): boolean {
    return this.clearedCards.map(card => card.position).includes(card.position)
  }

  clearIfIsPair(card: MemoryCard): void {
    if (this.isCardMatching(card)) this.addPairToClearedCards(card)
  }

  isFirstCardFlipped(): boolean {
    return this.flippedCards.length === 1
  }

  isSecondCardFlipped(): boolean {
    return this.flippedCards.length === 2
  }

  private addToFlippedCards(card: MemoryCard): void {
    this.flippedCards.push(card)
  }

  private resetFlippedCards(): void {
    this.flippedCards = []
  }

  private isCardMatching(card: MemoryCard): boolean {
    return this.flippedCards.every(flippedCard => flippedCard.id === card.id)
  }

  private addPairToClearedCards(card: MemoryCard): void {
    const pair = this.cards.filter(c => c.id === card.id)

    this.clearedCards.push(...pair)
  }

  private getMemoryCardsInRandomOrder(numberOfCards: number): MemoryCard[] {
    const pairsOfNumbersRandomOrder = shuffle(
      getDoubledArrayOfIndexes(numberOfCards)
    )
    return pairsOfNumbersRandomOrder.map((number, index) => ({
      position: index,
      id: number
    }))
  }
}

// helpers - can be moved to a separate file

function getDoubledArrayOfIndexes(numberOfIndexes: number): number[] {
  const arrayOfIndexes = getArrayOfIndexes(numberOfIndexes)
  return arrayOfIndexes.concat(arrayOfIndexes)
}

function getArrayOfIndexes(length: number): number[] {
  return [...Array(length).keys()]
}

export const defaultConfig = {
  pairsCount: 8,
  players: ["Me"]
}
