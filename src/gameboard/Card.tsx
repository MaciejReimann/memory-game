import React, { FunctionComponent, useContext } from "react"

import cxBinder from "classnames/bind"
import styles from "./Card.module.scss"
const cx = cxBinder.bind(styles)

export type CardId = number

interface CardProps {
  id: number
  onClick: () => void
  isFlipped: boolean
  isCleared: boolean
}

export const Card: FunctionComponent<CardProps> = ({
  id,
  onClick,
  isFlipped,
  isCleared,
  ...props
}) => {
  isFlipped && console.log(`isFlipped ${id}: `, isFlipped)
  isCleared && console.log(`isCleared ${id}: `, isCleared)

  return (
    <div
      className={cx(styles.wrapper, {
        "wrapper--flipped": isFlipped,
        "wrapper--flipped--cleared": isCleared
      })}
      onClick={onClick}
      {...props}
    >
      Card {id}
    </div>
  )
}
