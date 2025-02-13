"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function AIPrediction() {
  const [coin, setCoin] = useState("")
  const [prediction, setPrediction] = useState<null | { trend: 'up' | 'down', percentage: number }>(null)

  const handlePredict = () => {
    // Simulate AI prediction (replace with actual AI prediction logic)
    const randomTrend = Math.random() > 0.5 ? 'up' : 'down'
    const randomPercentage = +(Math.random() * 10).toFixed(2)
    setPrediction({ trend: randomTrend, percentage: randomPercentage })
  }

  return (
    <section id="ai-prediction" className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Price Prediction</h2>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Predict Crypto Trends</CardTitle>
            <CardDescription>Enter a cryptocurrency to get AI-powered price predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter cryptocurrency (e.g., BTC, ETH)" 
                value={coin} 
                onChange={(e) => setCoin(e.target.value)}
              />
              <Button onClick={handlePredict} className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200">Predict</Button>
            </div>
          </CardContent>
          {prediction && (
            <CardFooter>
              <div className="flex items-center space-x-2">
                <span>Prediction:</span>
                {prediction.trend === 'up' ? (
                  <TrendingUp className="text-green-500" />
                ) : (
                  <TrendingDown className="text-red-500" />
                )}
                <span className={prediction.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {prediction.percentage}%
                </span>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  )
}

