"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Brain, TrendingUp, MessageSquare, BarChart2 } from "lucide-react"

const sentimentData = [
  { time: "12:00", sentiment: 65, price: 45000 },
  { time: "13:00", sentiment: 70, price: 45200 },
  { time: "14:00", sentiment: 55, price: 44800 },
  { time: "15:00", sentiment: 80, price: 46000 },
  { time: "16:00", sentiment: 75, price: 45800 },
]

const sources = [
  { name: "Twitter", sentiment: 75, volume: 12500 },
  { name: "Reddit", sentiment: 68, volume: 8300 },
  { name: "News", sentiment: 82, volume: 4200 },
  { name: "Trading Forums", sentiment: 71, volume: 3100 },
]

export default function AIAnalysisPage() {
  const [symbol, setSymbol] = useState("BTC")
  const [timeframe, setTimeframe] = useState("24h")

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="grid gap-6">
        {/* Analysis Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>AI Sentiment Analysis</CardTitle>
              <div className="flex items-center gap-2">
                <Input
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="w-[100px]"
                  placeholder="Symbol"
                />
                <Button variant="outline">Analyze</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">75%</div>
                    <p className="text-sm text-muted-foreground">Overall Sentiment</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">12,543</div>
                    <p className="text-sm text-muted-foreground">Mentions</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">+5.2%</div>
                    <p className="text-sm text-muted-foreground">Predicted Move</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-sm text-muted-foreground">Confidence</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sentimentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="sentiment" stroke="#2563eb" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Source Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment by Source</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sources.map((source) => (
                  <div key={source.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{source.name}</span>
                      <span className="text-muted-foreground">{source.volume.toLocaleString()} mentions</span>
                    </div>
                    <Progress value={source.sentiment} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span
                        className={
                          source.sentiment >= 70
                            ? "text-green-500"
                            : source.sentiment >= 50
                              ? "text-yellow-500"
                              : "text-red-500"
                        }
                      >
                        {source.sentiment}% Positive
                      </span>
                      <span className="text-muted-foreground">{100 - source.sentiment}% Negative</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
                  <Brain className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Strong Buy Signal</h4>
                    <p className="text-sm text-muted-foreground">
                      AI models indicate a high probability of upward movement based on current sentiment and market
                      conditions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
                  <MessageSquare className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Social Sentiment</h4>
                    <p className="text-sm text-muted-foreground">
                      Positive discussions across social media platforms with increasing mention volume.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
                  <BarChart2 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Technical Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Multiple technical indicators showing bullish convergence patterns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
                  <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Price Prediction</h4>
                    <p className="text-sm text-muted-foreground">
                      AI models predict a potential 5-8% upward movement in the next 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

