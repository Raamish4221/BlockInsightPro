"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useState } from 'react'

const data = [
  { name: 'Jan', Bitcoin: 4000, Ethereum: 2400, Cardano: 1800 },
  { name: 'Feb', Bitcoin: 3000, Ethereum: 1398, Cardano: 1500 },
  { name: 'Mar', Bitcoin: 2000, Ethereum: 9800, Cardano: 2000 },
  { name: 'Apr', Bitcoin: 2780, Ethereum: 3908, Cardano: 2500 },
  { name: 'May', Bitcoin: 1890, Ethereum: 4800, Cardano: 2300 },
  { name: 'Jun', Bitcoin: 2390, Ethereum: 3800, Cardano: 2100 },
]

export default function MarketOverview() {
  const [hoveredCoin, setHoveredCoin] = useState<string | null>(null)

  return (
    <section id="market" className="py-20 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Market Overview</h2>
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Crypto Price Trends</CardTitle>
            <CardDescription>6-month price history for top cryptocurrencies</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="Bitcoin" 
                  stroke="#f7931a" 
                  strokeWidth={hoveredCoin === 'Bitcoin' ? 3 : 1}
                  onMouseEnter={() => setHoveredCoin('Bitcoin')}
                  onMouseLeave={() => setHoveredCoin(null)}
                />
                <Line 
                  type="monotone" 
                  dataKey="Ethereum" 
                  stroke="#62688f"
                  strokeWidth={hoveredCoin === 'Ethereum' ? 3 : 1}
                  onMouseEnter={() => setHoveredCoin('Ethereum')}
                  onMouseLeave={() => setHoveredCoin(null)}
                />
                <Line 
                  type="monotone" 
                  dataKey="Cardano" 
                  stroke="#0033ad"
                  strokeWidth={hoveredCoin === 'Cardano' ? 3 : 1}
                  onMouseEnter={() => setHoveredCoin('Cardano')}
                  onMouseLeave={() => setHoveredCoin(null)}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

