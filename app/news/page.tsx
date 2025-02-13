"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/Header"
import { Badge } from "@/components/ui/badge"

const newsData = [
  {
    title: "Bitcoin Surges Past Previous ATH",
    category: "Market Update",
    time: "2 hours ago",
    content: "Bitcoin has reached a new all-time high as institutional adoption continues to grow..."
  },
  {
    title: "New Regulatory Framework Proposed",
    category: "Regulation",
    time: "4 hours ago",
    content: "Government officials have proposed new regulatory guidelines for cryptocurrency trading..."
  },
  {
    title: "Major Bank Adopts Blockchain",
    category: "Adoption",
    time: "6 hours ago",
    content: "One of the world's largest banks announces integration of blockchain technology..."
  }
]

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="grid gap-6">
          {newsData.map((news, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>{news.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{news.category}</Badge>
                      <span className="text-sm text-muted-foreground">{news.time}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{news.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

