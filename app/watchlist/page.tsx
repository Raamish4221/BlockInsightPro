"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/Header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'

const initialWatchlist = [
  { symbol: "BTC/USDT", price: "65,432.10", change24h: "+5.43%", volume: "1.2B" },
  { symbol: "ETH/USDT", price: "3,456.78", change24h: "-2.1%", volume: "800M" },
  { symbol: "BNB/USDT", price: "456.78", change24h: "+1.2%", volume: "200M" },
]

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState(initialWatchlist)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Watchlist</CardTitle>
              <Button variant="outline" size="sm">
                <Star className="mr-2 h-4 w-4" />
                Add Symbol
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>24h Change</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {watchlist.map((item) => (
                  <TableRow key={item.symbol}>
                    <TableCell className="font-medium">{item.symbol}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell className={item.change24h.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                      {item.change24h}
                    </TableCell>
                    <TableCell>{item.volume}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

