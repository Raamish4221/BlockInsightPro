"use client"

import React, { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Bookmark, Share2, Download } from "lucide-react"
import dynamic from "next/dynamic"

const TradingViewWidget = dynamic(() => import("@/components/TradingViewWidget"), {
  ssr: false,
  loading: () => <div className="h-[600px] flex items-center justify-center">Loading chart...</div>,
})

const ChartPage: React.FC = () => {
  const [symbol, setSymbol] = useState("BINANCE:BTCUSDT")

  const marketData = useMemo(
    () => ({
      price: 45123.45,
      change: 2.34,
      high: 46789.0,
      low: 43210.0,
      volume: "12.5B",
      marketCap: "890.1B",
    }),
    [],
  )

  const handleSettingsClick = useCallback(() => {
    console.log("Settings clicked")
  }, [])

  const handleBookmarkClick = useCallback(() => {
    console.log("Bookmark clicked")
  }, [])

  const handleShareClick = useCallback(() => {
    console.log("Share clicked")
  }, [])

  const handleDownloadClick = useCallback(() => {
    console.log("Download clicked")
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold">BTC/USDT</h1>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-semibold text-green-500">{marketData.price.toFixed(2)}</span>
                <Badge variant="success">+{marketData.change}%</Badge>
              </div>
            </div>
            <Separator orientation="vertical" className="h-12" />
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              <MarketDataItem label="24h High" value={marketData.high.toFixed(2)} />
              <MarketDataItem label="24h Low" value={marketData.low.toFixed(2)} />
              <MarketDataItem label="24h Volume" value={marketData.volume} />
              <MarketDataItem label="Market Cap" value={marketData.marketCap} />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ActionButton icon={Settings} onClick={handleSettingsClick} />
            <ActionButton icon={Bookmark} onClick={handleBookmarkClick} />
            <ActionButton icon={Share2} onClick={handleShareClick} />
            <ActionButton icon={Download} onClick={handleDownloadClick} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative min-h-[600px] rounded-lg border">
            <TradingViewWidget
              symbol={symbol}
              theme="dark"
              interval="D"
              timezone="Etc/UTC"
              style="1"
              locale="en"
              toolbar_bg="#f1f3f6"
              enable_publishing={false}
              allow_symbol_change={true}
              save_image={true}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const MarketDataItem: React.FC<{ label: string; value: string | number }> = React.memo(({ label, value }) => (
  <div className="flex justify-between space-x-2">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
))

const ActionButton: React.FC<{ icon: React.ElementType; onClick: () => void }> = React.memo(
  ({ icon: Icon, onClick }) => (
    <Button variant="outline" size="icon" onClick={onClick}>
      <Icon className="h-4 w-4" />
    </Button>
  ),
)

export default ChartPage

