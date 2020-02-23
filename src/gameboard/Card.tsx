import React, { FunctionComponent } from "react"
import cxBinder from "classnames/bind"
import styles from "./Card.module.scss"
const cx = cxBinder.bind(styles)

export type CardId = number

interface CardProps {
  id: number
  onClick: (id: number) => void
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
  return (
    <div
      className={cx(styles.wrapper, {
        "wrapper--flipped": isFlipped,
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
