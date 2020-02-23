import { shuffle } from "lodash"

export type CardId = number
export type Player = string

export type MemoryGameConfig = {
  pairsCount: number
  players: Player[]
}

export class MemoryGame {
  readonly ids: CardId[]
  readonly players: Player[]

  selectedIndexes: number[] = []
  clearedIndexes: number[] = []

  constructor(config: MemoryGameConfig) {
    this.ids = getShuflfedPairedIds(config.pairsCount)
    this.players = config.players
  }

  getCardIds(): CardId[] {
    return this.ids
  }

  selectByIndex(index: number) {
    if (this.isMatchingWithSelected(index)) this.addToClearedIndexes(index)
    if (this.selectedIndexes.length === 2) this.selectedIndexes = []
    this.selectedIndexes.push(index)
  }

  getSelectedIndexes(): number[] {
    return this.selectedIndexes
  }

  addToClearedIndexes(index: number) {
    const pair = this.getPairByIndex(index)
    this.clearedIndexes.push(...pair)
  }

  getClearedIndexes(): number[] {
    return this.clearedIndexes
  }

  private getPairByIndex(index: number): number[] {
    let pairOfIndexes: number[] = []
    const searchedId = this.ids[index]
    this.ids.forEach((id, i) => {
      if (id === searchedId) pairOfIndexes.push(i)
    })
    return pairOfIndexes
  }

  private isMatchingWithSelected(index: number) {
    return this.getIdsOfSelected().includes(this.ids[index])
  }

  private getIdsOfSelected() {
    return this.selectedIndexes.map(i => this.ids[i])
  }
}

// helpers - can be easily moved to a separate file

function getShuflfedPairedIds(numberOfIndexes: number): CardId[] {
  return shuffle(getDoubledArrayOfIndexes(numberOfIndexes))
}

function getDoubledArrayOfIndexes(numberOfIndexes: number): CardId[] {
  const arrayOfIndexes = getArrayOfIndexes(numberOfIndexes)
  return arrayOfIndexes.concat(arrayOfIndexes)
}

function getArrayOfIndexes(length: number): CardId[] {
  return [...Array(length).keys()]
}

export const defaultConfig = {
  pairsCount: 8,
  players: ["Me"]
}
