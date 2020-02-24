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
    if (this.isCardMatching(card)) {
      this.addPairToClearedCards(card)
      return
    }

    if (this.flippedCards.length > 1) {
      this.resetFlippedCards()
      return
    }

    this.addToFlippedCards(card)
  }

  getFlippedCards(): MemoryCard[] {
    return this.flippedCards
  }

  getClearedCards(): MemoryCard[] {
    return this.clearedCards
  }

  private isNoneOfCardsFlipped(): boolean {
    return this.flippedCards.length < 1
  }

  private addToFlippedCards(card: MemoryCard): void {
    this.flippedCards.push(card)
  }

  private isCardMatching(card: MemoryCard): boolean {
    return this.flippedCards.map(card => card.id).includes(card.id)
  }

  private addPairToClearedCards(card: MemoryCard): void {
    this.clearedCards.push(card, ...this.flippedCards)
  }

  private resetFlippedCards(): void {
    this.flippedCards = []
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