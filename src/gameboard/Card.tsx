import React, { FunctionComponent, useState, useEffect } from "react"
import cxBinder from "classnames/bind"
import styles from "./Card.module.scss"
const cx = cxBinder.bind(styles)

export type CardId = number

interface CardProps {
  id: number
  onClick: (id: number) => void
  isFlipped: boolean
  isCleared: boolean
  // canBeFlipped: boolean // only if flipped.length < 2
  shouldWaitForFlipback: boolean
}

export const Card: FunctionComponent<CardProps> = ({
  id,
  onClick,
  isFlipped,
  isCleared,
  shouldWaitForFlipback,
  ...props
}) => {
  const [flipped, setFlipped] = useState(false)

  shouldWaitForFlipback && console.log(id)

  useEffect(() => {
    setTimeout(() => {
      setFlipped(false)
    }, 1000)
  }, [flipped])

  return (
    <div
      className={cx(styles.wrapper, {
        "wrapper--flipped": flipped,
        "wrapper--flipped--cleared": isCleared
      })}
      onClick={() => {
        setFlipped(true)
        onClick(id)
      }}
      {...props}
    >
      Card {id}
    </div>
  )
}
