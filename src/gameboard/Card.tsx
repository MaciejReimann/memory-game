import React, { FunctionComponent, useState, SetStateAction } from "react"
import cxBinder from "classnames/bind"
import styles from "./Card.module.scss"
const cx = cxBinder.bind(styles)

export type CardId = number

interface CardProps {
  id: CardId
  onClick: (id: number) => void
  isTurned: boolean
  isCleared: boolean
}

export const Card: FunctionComponent<CardProps> = ({
  id,
  onClick,
  isTurned,
  isCleared,
  ...props
}) => {
  //   const [isClicked, setIsClicked] = useState<SetStateAction<null | boolean>>(
  //     null
  //   )

  return (
    <div
      className={cx(styles.wrapper, {
        "wrapper--turned": isTurned,
        "wrapper--cleared": isCleared
      })}
      onClick={() => {
        // setIsClicked(!isClicked)
        onClick(id)
      }}
      {...props}
    >
      Card {id}
    </div>
  )
}
