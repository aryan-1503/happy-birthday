"use client"

import { useEffect, useState, useCallback } from "react"
import Confetti from "react-confetti"

export default function Confettis() {
  const [windowDimension, setWindowDimension] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  const detectSize = useCallback(() => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  useEffect(() => {
    window.addEventListener("resize", detectSize)
    return () => {
      window.removeEventListener("resize", detectSize)
    }
  }, [detectSize])

  return (
    <Confetti
      width={windowDimension.width}
      height={windowDimension.height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.2}
      colors={["#f472b6", "#c084fc", "#60a5fa", "#4ade80", "#facc15"]}
    />
  )
}

