import React from "react"
import io from "socket.io-client"
import styles from "./App.module.scss"
import { MemoryGame } from "./momory-game/memory-game"
import { Gameboard } from "./gameboard/Gameboard"

function App() {
  const game = new MemoryGame({ pairsCount: 8 })
  const socket = io.connect("https://memory-gamers.herokuapp.com")
  const onConnect = () => console.log("Socket connented: ", socket.connected)
  socket.on("connect", onConnect)

  // const socket = {
  //   selectCard: (id: any) => socket.emit("card selected", id),
  //   onSelectCard: (cb: (id: any) => void) => {
  //     socket.on("card selected", (id: any) => {
  //       console.log("asdfsadf", id)
  //       cb(id)
  //     })
  //   }
  // }
  return (
    <div className={styles["wrapper"]}>
      <Gameboard socket={socket} game={game} />
    </div>
  )
}

export default App
