"use client"

import { useEffect, useRef, useState } from "react"

interface Point {
  x: number
  y: number
}

interface DrawingProps {
  width: number
  height: number
  tool: string
}

export function ChartDrawing({ width, height, tool }: DrawingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPoint, setStartPoint] = useState<Point | null>(null)
  const [lines, setLines] = useState<{ start: Point; end: Point; tool: string }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw all saved lines
    lines.forEach((line) => {
      drawLine(ctx, line.start, line.end, line.tool)
    })
  }, [lines, width, height])

  const drawLine = (ctx: CanvasRenderingContext2D, start: Point, end: Point, tool: string) => {
    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.strokeStyle = tool === "trendLine" ? "#3b82f6" : "#ef4444"
    ctx.lineWidth = 2
    ctx.stroke()
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)
    setStartPoint({ x, y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas and redraw all lines
    ctx.clearRect(0, 0, width, height)
    lines.forEach((line) => {
      drawLine(ctx, line.start, line.end, line.tool)
    })

    // Draw current line
    drawLine(ctx, startPoint, { x, y }, tool)
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setLines([...lines, { start: startPoint, end: { x, y }, tool }])
    setIsDrawing(false)
    setStartPoint(null)
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="absolute inset-0 z-10 cursor-crosshair"
    />
  )
}

