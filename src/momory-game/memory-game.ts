import { shuffle } from "lodash"

export type CardId = number
export type Player = string

export type MemoryGameConfig = {
  pairsCount: number
}

export class MemoryGame {
  readonly ids: CardId[]
  readonly players: Player[]
  selectedIndexes: number[] = []
  clearedIndexes: number[] = []

  constructor(readonly config: MemoryGameConfig) {
    this.ids = getShuflfedPairedIds(this.config.pairsCount)
    this.players = ["Me"]
  }

  getIds(): CardId[] {
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

////////////////////////////////////////////////////////////////
function getShuflfedPairedIds(howMany: number): CardId[] {
  return shuffle(getPairedIds(howMany))
}

function getPairedIds(howMany: number): CardId[] {
  return [...getIds(howMany), ...getIds(howMany)]
}

function getIds(howMany: number): CardId[] {
  return [...Array(howMany).keys()].map((_, i) => i)
}

export const memoryGameConfig = {
  pairsCount: 8
}
