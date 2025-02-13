"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Download,
  Plus,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import Header from "@/components/Header"
import { BinanceConnectButton } from "@/components/BinanceConnectButton"
import { BinanceConnectModal } from "@/components/BinanceConnectModal"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Pie,
  PieChart as RechartsChartPie,
  Cell,
  Tooltip,
  Legend,
} from "recharts"

const initialPortfolio = [
  { name: "BTC", value: 61058804, quantity: 1.5, change: 2.5 },
  { name: "ETH", value: 30000000, quantity: 15, change: -1.2 },
  { name: "ADA", value: 10000000, quantity: 50000, change: 0.8 },
  { name: "DOGE", value: 5000000, quantity: 100000, change: 5.3 },
  { name: "Others", value: 4926196, quantity: 0, change: 0 },
]

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]

const performanceData = [
  { name: "Jan", value: 95000 },
  { name: "Feb", value: 98000 },
  { name: "Mar", value: 102000 },
  { name: "Apr", value: 100000 },
  { name: "May", value: 105000 },
  { name: "Jun", value: 110985 },
]

const profitLossData = [
  { name: "Mon", value: 2000 },
  { name: "Tue", value: -1000 },
  { name: "Wed", value: -500 },
  { name: "Thu", value: 3000 },
  { name: "Fri", value: 2500 },
]

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(initialPortfolio)
  const [newCoin, setNewCoin] = useState("")
  const [newValue, setNewValue] = useState("")
  const [newQuantity, setNewQuantity] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isBinanceModalOpen, setIsBinanceModalOpen] = useState(false)
  const [showAIPrediction, setShowAIPrediction] = useState(false)

  const handleAddCoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCoin && newValue && newQuantity) {
      setPortfolio([
        ...portfolio,
        { name: newCoin, value: Number.parseFloat(newValue), quantity: Number.parseFloat(newQuantity), change: 0 },
      ])
      setNewCoin("")
      setNewValue("")
      setNewQuantity("")
      setIsDialogOpen(false)
    }
  }

  const totalValue = portfolio.reduce((sum, coin) => sum + coin.value, 0)

  const generateReport = () => {
    console.log("Generating report...")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4 pt-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Portfolio Management</h1>
          <div className="flex flex-wrap gap-4">
            <BinanceConnectButton onClick={() => setIsBinanceModalOpen(true)} />
            <Button onClick={generateReport} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Overview</CardTitle>
              <CardDescription>Your total portfolio value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">${totalValue.toLocaleString()}</div>
              <ChartContainer
                config={{
                  value: {
                    label: "Value",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[250px] overflow-hidden"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="text-sm text-muted-foreground">24h Change</span>
                  <p className="text-lg font-semibold text-green-500">+5.31%</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">High</span>
                  <p className="text-lg font-semibold">$116,689</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Low</span>
                  <p className="text-lg font-semibold">$96,567</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2" />
                Asset Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsChartPie>
                    <Pie
                      data={portfolio}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {portfolio.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsChartPie>
                </ResponsiveContainer>
              </div>
              <ScrollArea className="h-[200px] mt-4">
                {portfolio.map((coin, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span>{coin.name}</span>
                    </div>
                    <span>{((coin.value / totalValue) * 100).toFixed(2)}%</span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2" />
                Profit & Loss Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Value",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[180px] overflow-hidden"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitLossData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="value"
                      fill={(data) => (data.value >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))")}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <p className="text-sm mt-4">Daily profit and loss analysis for the past week.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2" />
                Portfolio Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Diversification</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Risk Level</span>
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Performance</span>
                    <span className="text-sm font-medium">Good</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span>Show AI Prediction</span>
                <Switch checked={showAIPrediction} onCheckedChange={setShowAIPrediction} />
              </div>
              {showAIPrediction && (
                <div className="space-y-2">
                  <p className="text-sm mb-4">Our AI suggests the following actions:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <TrendingUp className="mr-2 text-green-500" />
                      <span>Consider increasing your Bitcoin holdings</span>
                    </li>
                    <li className="flex items-center">
                      <BarChart3 className="mr-2 text-yellow-500" />
                      <span>Diversify with some mid-cap altcoins</span>
                    </li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Portfolio Details</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Coin
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Coin</DialogTitle>
                    <DialogDescription>Enter the details of the new coin to add to your portfolio.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddCoin}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="coin-name" className="text-right">
                          Coin Name
                        </Label>
                        <Input
                          id="coin-name"
                          value={newCoin}
                          onChange={(e) => setNewCoin(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="coin-value" className="text-right">
                          Value ($)
                        </Label>
                        <Input
                          id="coin-value"
                          type="number"
                          value={newValue}
                          onChange={(e) => setNewValue(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="coin-quantity" className="text-right">
                          Quantity
                        </Label>
                        <Input
                          id="coin-quantity"
                          type="number"
                          value={newQuantity}
                          onChange={(e) => setNewQuantity(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Coin</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Coin</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>24h Change</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolio.map((coin, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{coin.name}</TableCell>
                    <TableCell>{coin.quantity}</TableCell>
                    <TableCell>${coin.value.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={coin.change >= 0 ? "success" : "destructive"}>
                        {coin.change >= 0 ? (
                          <ArrowUpRight className="inline mr-1 h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="inline mr-1 h-4 w-4" />
                        )}
                        {Math.abs(coin.change)}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Trade
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <BinanceConnectModal isOpen={isBinanceModalOpen} onClose={() => setIsBinanceModalOpen(false)} />
    </div>
  )
}

