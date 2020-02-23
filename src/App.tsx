import React from "react"
import styles from "./App.module.scss"
import { MemoryGame, defaultConfig } from "./momory-game/memory-game"
import { Gameboard } from "./gameboard/Gameboard"

function App() {
  const game = new MemoryGame(defaultConfig)

  return (
    <div className={styles["wrapper"]}>
      <Gameboard game={game} />
    </div>
  )
}

export default App
