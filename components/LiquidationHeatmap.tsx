"use client"

import { useEffect, useRef } from "react"

interface HeatmapProps {
  data: {
    timestamp: number
    price: number
    liquidations: number
    type: "long" | "short"
  }[]
  width: number
  height: number
}

export function LiquidationHeatmap({ data, width, height }: HeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw heatmap
    data.forEach((point) => {
      const x = (point.timestamp / (24 * 60 * 60 * 1000)) * width
      const y =
        ((point.price - Math.min(...data.map((d) => d.price))) /
          (Math.max(...data.map((d) => d.price)) - Math.min(...data.map((d) => d.price)))) *
        height

      const intensity = point.liquidations / Math.max(...data.map((d) => d.liquidations))
      const color = point.type === "long" ? `rgba(239, 68, 68, ${intensity})` : `rgba(34, 197, 94, ${intensity})`

      ctx.fillStyle = color
      ctx.fillRect(x, y, 2, 2)
    })
  }, [data, width, height])

  return <canvas ref={canvasRef} width={width} height={height} className="w-full h-full" />
}

