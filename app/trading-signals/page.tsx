"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUp, ArrowDown, MessageSquare, ThumbsUp, ThumbsDown, Share2, Flag } from "lucide-react"

// Sample data for trading signals
const tradingSignals = [
  {
    id: 1,
    user: { name: "Alice", avatar: "/placeholder.svg?height=32&width=32" },
    symbol: "BTC/USDT",
    type: "buy",
    price: 45000,
    target: 48000,
    stopLoss: 43000,
    rationale: "Bullish pattern forming on the 4h chart",
    timestamp: "2023-05-15T10:30:00Z",
    likes: 120,
    comments: 15,
  },
  {
    id: 2,
    user: { name: "Bob", avatar: "/placeholder.svg?height=32&width=32" },
    symbol: "ETH/USDT",
    type: "sell",
    price: 3200,
    target: 3000,
    stopLoss: 3300,
    rationale: "Resistance at $3300, expecting a pullback",
    timestamp: "2023-05-15T11:15:00Z",
    likes: 85,
    comments: 8,
  },
  // Add more sample signals as needed
]

export default function TradingSignalsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Trading Signals</CardTitle>
            <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
              <DialogTrigger asChild>
                <Button>Post Signal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Post a New Trading Signal</DialogTitle>
                  <DialogDescription>
                    Share your trading signal with the community. Be responsible and provide accurate information.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="symbol">Symbol</Label>
                      <Input id="symbol" placeholder="e.g. BTC/USDT" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <select id="type" className="w-full p-2 rounded-md border border-input">
                        <option>Buy</option>
                        <option>Sell</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Entry Price</Label>
                      <Input id="price" type="number" placeholder="Entry Price" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target">Target Price</Label>
                      <Input id="target" type="number" placeholder="Target Price" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stopLoss">Stop Loss</Label>
                      <Input id="stopLoss" type="number" placeholder="Stop Loss" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rationale">Rationale</Label>
                    <Textarea id="rationale" placeholder="Explain your trading signal..." />
                  </div>
                  <Button type="submit" className="w-full">
                    Post Signal
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Signals</TabsTrigger>
              <TabsTrigger value="buy">Buy Signals</TabsTrigger>
              <TabsTrigger value="sell">Sell Signals</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Entry</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Stop Loss</TableHead>
                    <TableHead>Rationale</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tradingSignals.map((signal) => (
                    <TableRow key={signal.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={signal.user.avatar} alt={signal.user.name} />
                            <AvatarFallback>{signal.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <span>{signal.user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{signal.symbol}</TableCell>
                      <TableCell>
                        <Badge variant={signal.type === "buy" ? "success" : "destructive"}>
                          {signal.type === "buy" ? (
                            <ArrowUp className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDown className="w-4 h-4 mr-1" />
                          )}
                          {signal.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>${signal.price}</TableCell>
                      <TableCell>${signal.target}</TableCell>
                      <TableCell>${signal.stopLoss}</TableCell>
                      <TableCell>{signal.rationale}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {signal.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {signal.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Flag className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            {/* Implement other tab contents similarly */}
          </Tabs>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Disclaimer</h3>
        <p className="text-sm text-muted-foreground">
          The organization is not responsible for any trading signals shared on this platform. Users should conduct
          their own research and exercise caution while trading. Past performance is not indicative of future results.
        </p>
      </div>
    </div>
  )
}

