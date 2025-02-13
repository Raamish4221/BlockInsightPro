"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Header from "@/components/Header"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Download,
  RefreshCw,
  Bell,
  Settings,
  Info,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { HeatmapModel1, HeatmapModel2, HeatmapModel3 } from "./heatmap-models"

const timeframes = [
  { label: "24h", value: "24h" },
  { label: "12h", value: "12h" },
  { label: "6h", value: "6h" },
  { label: "1h", value: "1h" },
  { label: "30m", value: "30m" },
  { label: "15m", value: "15m" },
  { label: "5m", value: "5m" },
]

const exchanges = [
  { label: "All Exchanges", value: "all" },
  { label: "Binance", value: "binance" },
  { label: "Bybit", value: "bybit" },
  { label: "OKX", value: "okx" },
  { label: "Bitget", value: "bitget" },
  { label: "Gate.io", value: "gateio" },
]

const pairs = [
  { label: "BTC/USDT", value: "BTCUSDT" },
  { label: "ETH/USDT", value: "ETHUSDT" },
  { label: "BNB/USDT", value: "BNBUSDT" },
  { label: "SOL/USDT", value: "SOLUSDT" },
  { label: "XRP/USDT", value: "XRPUSDT" },
  { label: "DOGE/USDT", value: "DOGEUSDT" },
]

export default function LiquidationHeatmapPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const [selectedPair, setSelectedPair] = useState("BTCUSDT")
  const [selectedExchange, setSelectedExchange] = useState("all")
  const [activeTab, setActiveTab] = useState("model1")
  const [liquidationType, setLiquidationType] = useState<"all" | "long" | "short">("all")
  const [showAlerts, setShowAlerts] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [showLegend, setShowLegend] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4 pt-20">
        {/* Alert Banner */}
        {showAlerts && (
          <Alert className="mb-6 bg-yellow-500/10 border-yellow-500/50">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-500">
              Large liquidation event detected: $25M BTC longs liquidated in the last 5 minutes
            </AlertDescription>
          </Alert>
        )}

        {/* Market Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">24h Volume</span>
                <span className="text-xl font-bold text-red-500">$262,465,730,458</span>
                <div className="flex items-center space-x-1">
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-500">-38.68%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Open Interest</span>
                <span className="text-xl font-bold text-green-500">$149,320,906,065</span>
                <div className="flex items-center space-x-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">+1.35%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">24h Liquidation</span>
                <span className="text-xl font-bold">$208,014,921</span>
                <div className="flex items-center space-x-1">
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-500">-45.53%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">24h Long/Short</span>
                <span className="text-xl font-bold">50.18%/49.82%</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">Longs Dominant</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CardTitle>Liquidation Heatmap</CardTitle>
                <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                  PRO
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="model1">Classic View</TabsTrigger>
                    <TabsTrigger value="model2">Price Level</TabsTrigger>
                    <TabsTrigger value="model3">Time Series</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={liquidationType === "all" ? "default" : "outline"}
                    onClick={() => setLiquidationType("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={liquidationType === "long" ? "default" : "outline"}
                    onClick={() => setLiquidationType("long")}
                    className="text-red-500"
                  >
                    Long
                  </Button>
                  <Button
                    variant={liquidationType === "short" ? "default" : "outline"}
                    onClick={() => setLiquidationType("short")}
                    className="text-green-500"
                  >
                    Short
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedExchange} onValueChange={setSelectedExchange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Exchange" />
                </SelectTrigger>
                <SelectContent>
                  {exchanges.map((exchange) => (
                    <SelectItem key={exchange.value} value={exchange.value}>
                      {exchange.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPair} onValueChange={setSelectedPair}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Pair" />
                </SelectTrigger>
                <SelectContent>
                  {pairs.map((pair) => (
                    <SelectItem key={pair.value} value={pair.value}>
                      {pair.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  {timeframes.map((tf) => (
                    <SelectItem key={tf.value} value={tf.value}>
                      {tf.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2 border-l border-border pl-2">
                <Button variant="outline" size="icon" onClick={() => setShowAlerts(!showAlerts)}>
                  <Bell className={`h-4 w-4 ${showAlerts ? "text-yellow-500" : ""}`} />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setAutoRefresh(!autoRefresh)}>
                  <RefreshCw className={`h-4 w-4 ${autoRefresh ? "text-primary" : ""}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <Tabs value={activeTab} className="mt-4">
            <TabsContent value="model1">
              <HeatmapModel1 />
            </TabsContent>
            <TabsContent value="model2">
              <HeatmapModel2 />
            </TabsContent>
            <TabsContent value="model3">
              <HeatmapModel3 />
            </TabsContent>
          </Tabs>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch checked={showLegend} onCheckedChange={setShowLegend} />
                    <span className="text-sm">Show Legend</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Info className="h-4 w-4 mr-1" />
                    How to Read
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm">Long Liquidations</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm">Short Liquidations</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Liquidations</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">BTC/USDT</span>
                        <span className="ml-2 text-sm text-muted-foreground">Binance</span>
                      </div>
                      <div>
                        <span className={i % 2 === 0 ? "text-red-500" : "text-green-500"}>
                          {i % 2 === 0 ? "Long" : "Short"}
                        </span>
                        <span className="ml-2">${(Math.random() * 1000000).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Liquidation Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Liquidations</span>
                  <span className="font-bold">$208,014,921</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Long Liquidations</span>
                  <span className="text-red-500">$104,007,460 (50%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Short Liquidations</span>
                  <span className="text-green-500">$104,007,461 (50%)</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full" style={{ width: "50%" }} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Exchange Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exchanges.slice(1).map((exchange, i) => (
                  <div key={exchange.value} className="flex justify-between items-center">
                    <span>{exchange.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">${(Math.random() * 10000000).toFixed(2)}</span>
                      <Badge variant="outline">{(Math.random() * 100).toFixed(1)}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

