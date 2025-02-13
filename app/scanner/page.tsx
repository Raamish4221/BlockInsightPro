"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react"

interface ScannerFilters {
  marketCap: [number, number]
  volume: [number, number]
  price: [number, number]
  change: [number, number]
}

const initialFilters: ScannerFilters = {
  marketCap: [0, 1000000000000],
  volume: [0, 1000000000],
  price: [0, 100000],
  change: [-100, 100],
}

export default function ScannerPage() {
  const [filters, setFilters] = useState<ScannerFilters>(initialFilters)
  const [timeframe, setTimeframe] = useState("24h")
  const [sortBy, setSortBy] = useState("marketCap")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Sample data - in a real app, this would come from an API
  const coins = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 45000,
      marketCap: 850000000000,
      volume: 25000000000,
      change: 2.5,
      signals: 3,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 2800,
      marketCap: 320000000000,
      volume: 15000000000,
      change: -1.2,
      signals: 5,
    },
    // Add more sample data as needed
  ]

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="grid gap-6">
        {/* Filters Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Market Scanner</CardTitle>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Market Cap Range ($)</label>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  className="w-full"
                  onValueChange={(value) => {
                    setFilters({
                      ...filters,
                      marketCap: [value[0] * 10000000000, value[1] * 10000000000],
                    })
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${filters.marketCap[0] / 1e9}B</span>
                  <span>${filters.marketCap[1] / 1e9}B</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">24h Volume ($)</label>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  className="w-full"
                  onValueChange={(value) => {
                    setFilters({
                      ...filters,
                      volume: [value[0] * 10000000, value[1] * 10000000],
                    })
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${filters.volume[0] / 1e6}M</span>
                  <span>${filters.volume[1] / 1e6}M</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range ($)</label>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  className="w-full"
                  onValueChange={(value) => {
                    setFilters({
                      ...filters,
                      price: [value[0] * 1000, value[1] * 1000],
                    })
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${filters.price[0]}</span>
                  <span>${filters.price[1]}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">% Change</label>
                <Slider
                  defaultValue={[-100, 100]}
                  min={-100}
                  max={100}
                  step={1}
                  className="w-full"
                  onValueChange={(value) => {
                    setFilters({
                      ...filters,
                      change: value as [number, number],
                    })
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{filters.change[0]}%</span>
                  <span>{filters.change[1]}%</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <div className="flex-1">
                <Input
                  placeholder="Search by name or symbol..."
                  className="w-full"
                  prefix={<Search className="w-4 h-4 text-muted-foreground" />}
                />
              </div>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="24h">24 Hours</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Market Cap</TableHead>
                  <TableHead className="text-right">Volume (24h)</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead className="text-right">Signals</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coins.map((coin, index) => (
                  <TableRow key={coin.symbol}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{coin.name}</span>
                        <span className="text-muted-foreground">{coin.symbol}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${coin.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${(coin.marketCap / 1e9).toFixed(2)}B</TableCell>
                    <TableCell className="text-right">${(coin.volume / 1e9).toFixed(2)}B</TableCell>
                    <TableCell className="text-right">
                      <span className={coin.change >= 0 ? "text-green-500" : "text-red-500"}>{coin.change}%</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{coin.signals}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

