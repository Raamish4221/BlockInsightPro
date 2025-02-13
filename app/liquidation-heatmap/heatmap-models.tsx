"use client"

import { useEffect, useRef } from "react"

// Helper function to generate gradient colors
const getGradientColor = (value: number): string => {
  const hue = ((1 - value) * 120).toString(10)
  return `hsl(${hue}, 100%, 50%)`
}

export function HeatmapModel1() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Demo data generation
    const width = canvas.width
    const height = canvas.height
    const imageData = ctx.createImageData(width, height)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = Math.sin(x / 50) * Math.cos(y / 50) * 0.5 + 0.5
        const color = getGradientColor(value)
        const rgb = color.match(/\d+/g)?.map(Number) || [0, 0, 0]

        const index = (y * width + x) * 4
        imageData.data[index] = rgb[0]
        imageData.data[index + 1] = rgb[1]
        imageData.data[index + 2] = rgb[2]
        imageData.data[index + 3] = 255 * value
      }
    }

    ctx.putImageData(imageData, 0, 0)
  }, [])

  return <canvas ref={canvasRef} width={800} height={400} className="w-full h-[400px] rounded-lg" />
}

export function HeatmapModel2() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Demo data generation
    const width = canvas.width
    const height = canvas.height
    const imageData = ctx.createImageData(width, height)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = Math.cos(x / 30) * Math.sin(y / 30) * 0.5 + 0.5
        const color = getGradientColor(value)
        const rgb = color.match(/\d+/g)?.map(Number) || [0, 0, 0]

        const index = (y * width + x) * 4
        imageData.data[index] = rgb[0]
        imageData.data[index + 1] = rgb[1]
        imageData.data[index + 2] = rgb[2]
        imageData.data[index + 3] = 255 * value
      }
    }

    ctx.putImageData(imageData, 0, 0)
  }, [])

  return <canvas ref={canvasRef} width={800} height={400} className="w-full h-[400px] rounded-lg" />
}

export function HeatmapModel3() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Demo data generation
    const width = canvas.width
    const height = canvas.height
    const imageData = ctx.createImageData(width, height)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = (Math.sin(x / 40) + Math.cos(y / 40)) * 0.5 + 0.5
        const color = getGradientColor(value)
        const rgb = color.match(/\d+/g)?.map(Number) || [0, 0, 0]

        const index = (y * width + x) * 4
        imageData.data[index] = rgb[0]
        imageData.data[index + 1] = rgb[1]
        imageData.data[index + 2] = rgb[2]
        imageData.data[index + 3] = 255 * value
      }
    }

    ctx.putImageData(imageData, 0, 0)
  }, [])

  return <canvas ref={canvasRef} width={800} height={400} className="w-full h-[400px] rounded-lg" />
}

