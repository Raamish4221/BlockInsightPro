"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Bar } from 'recharts'

interface CandleData {
  date: string
  open: number
  high: number
  low: number
  close: number
}

const generateCandleData = (days: number): CandleData[] => {
  const data: CandleData[] = []
  let currentPrice = 45000
  
  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    const volatility = Math.random() * 0.03
    const open = currentPrice
    const close = currentPrice * (1 + (Math.random() - 0.5) * volatility)
    const high = Math.max(open, close) * (1 + Math.random() * 0.01)
    const low = Math.min(open, close) * (1 - Math.random() * 0.01)
    
    data.push({
      date: date.toLocaleDateString(),
      open,
      high,
      low,
      close,
    })
    
    currentPrice = close
  }
  
  return data
}

export function CandlestickChart() {
  const [data, setData] = useState<CandleData[]>([])
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  useEffect(() => {
    setData(generateCandleData(30))
  }, [])

  return (
    <div className="w-full h-[400px] relative group">
      {/* Glow effect container */}
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 60,
            bottom: 5,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.1)"
          />
          <XAxis 
            dataKey="date"
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)' }}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
          />
          {/* Wicks */}
          <Bar
            dataKey="high"
            fill="transparent"
            stroke={(data) => (data.close > data.open ? '#22c55e' : '#ef4444')}
            strokeWidth={1}
          />
          <Bar
            dataKey="low"
            fill="transparent"
            stroke={(data) => (data.close > data.open ? '#22c55e' : '#ef4444')}
            strokeWidth={1}
          />
          {/* Bodies */}
          <Bar
            dataKey={(data) => Math.abs(data.close - data.open)}
            fill={(data) => (data.close > data.open ? '#22c55e' : '#ef4444')}
            stroke={(data) => (data.close > data.open ? '#22c55e' : '#ef4444')}
            baseValue={(data) => Math.min(data.open, data.close)}
            onMouseEnter={(data, index) => setHoveredBar(index)}
            onMouseLeave={() => setHoveredBar(null)}
            className={hoveredBar !== null ? 'candlestick-hover' : ''}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

