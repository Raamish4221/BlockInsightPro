"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Wallet,
  TrendingUp,
  Users,
  Activity,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Bell,
  Settings,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts"
import { ProfileEditor } from "./components/ProfileEditor"
import { ProfilePictureSelector } from "./components/ProfilePictureSelector"
import { CandlestickChart } from "@/components/CandlestickChart"
import type { User } from "@/types/auth"
import { followUser } from "../actions/user"
import { toast } from "sonner"
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
import Link from "next/link"

const performanceData = [
  { name: "Jan", value: 95000 },
  { name: "Feb", value: 98000 },
  { name: "Mar", value: 102000 },
  { name: "Apr", value: 100000 },
  { name: "May", value: 105000 },
  { name: "Jun", value: 110985 },
]

const marketOverviewData = [
  { name: "BTC", price: 45000, change: 2.5 },
  { name: "ETH", price: 3200, change: -1.2 },
  { name: "BNB", price: 420, change: 0.8 },
  { name: "ADA", price: 1.2, change: 3.5 },
  { name: "XRP", price: 0.75, change: -0.5 },
]

const volumeData = [
  { name: "00:00", BTC: 4000, ETH: 2400 },
  { name: "04:00", BTC: 3000, ETH: 1398 },
  { name: "08:00", BTC: 2000, ETH: 9800 },
  { name: "12:00", BTC: 2780, ETH: 3908 },
  { name: "16:00", BTC: 1890, ETH: 4800 },
  { name: "20:00", BTC: 2390, ETH: 3800 },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isFollowing, setIsFollowing] = useState(false)
  const [profileImage, setProfileImage] = useState(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20(1)-NTjdzJe7SfZPzZ7VsrG7ifcNGZCsli.jpeg",
  )
  const [user, setUser] = useState<User>({
    id: "1",
    name: "Crypto Trader",
    email: "trader@example.com",
    following: 245,
    followers: 12500,
    trades: 89,
    joinedAt: new Date(),
    bio: "Professional crypto trader and analyst",
    socialLinks: {
      twitter: "@cryptotrader",
    },
  })

  const handleFollow = async () => {
    const response = await followUser(user.id)
    if (response.success) {
      setIsFollowing(!isFollowing)
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
  }

  const handleProfileUpdate = () => {
    toast.success("Profile updated successfully")
  }

  const handleProfilePictureChange = (url: string) => {
    setProfileImage(url)
    toast.success("Profile picture updated successfully!")
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="w-full lg:w-1/4">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={profileImage} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">@{user.socialLinks?.twitter}</p>
                <div className="mt-4 flex gap-4">
                  <ProfilePictureSelector currentImage={profileImage} onSelect={handleProfilePictureChange} />
                  <ProfileEditor user={user} onUpdate={handleProfileUpdate} />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{user.following}</p>
                  <p className="text-muted-foreground">Following</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.followers}</p>
                  <p className="text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.trades}</p>
                  <p className="text-muted-foreground">Trades</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="pair" className="text-sm font-medium">
                          Select Asset
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select asset" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                            <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                            <SelectItem value="bnb">Binance Coin (BNB)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="timeframe" className="text-sm font-medium">
                          Timeframe
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1h">1 Hour</SelectItem>
                            <SelectItem value="4h">4 Hours</SelectItem>
                            <SelectItem value="1d">1 Day</SelectItem>
                            <SelectItem value="1w">1 Week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Link href="/ai-analysis">
                        <Button className="w-full">Run AI Analysis</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <Bell className="mr-2 h-4 w-4" /> Set Alert
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Set Price Alert</DialogTitle>
                      <DialogDescription>Configure your price alert settings.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="asset" className="text-right">
                          Asset
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select asset" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                            <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                            <SelectItem value="bnb">Binance Coin (BNB)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                          Price
                        </Label>
                        <Input id="price" type="number" placeholder="Enter price" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="condition" className="text-right">
                          Condition
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="above">Above</SelectItem>
                            <SelectItem value="below">Below</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Set Alert</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <Settings className="mr-2 h-4 w-4" /> Account Settings
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Account Settings</DialogTitle>
                      <DialogDescription>Manage your account settings and preferences.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" defaultValue={user.name} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input id="email" defaultValue={user.email} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="theme" className="text-right">
                          Theme
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trading">Trading</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Portfolio Performance</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12.5%</div>
                    <p className="text-xs text-muted-foreground">+2.5% from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">3 profitable, 4 in progress</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">AI Predictions</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">New signals available</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Portfolio Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Market Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {marketOverviewData.map((coin) => (
                        <div key={coin.name} className="flex items-center">
                          <div className="w-[30px] h-[30px] mr-2 rounded-full bg-primary/20 flex items-center justify-center">
                            {coin.name[0]}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className="font-medium">{coin.name}</span>
                              <span>${coin.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Price</span>
                              <span className={coin.change >= 0 ? "text-green-500" : "text-red-500"}>
                                {coin.change >= 0 ? "+" : ""}
                                {coin.change}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trading">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Trading Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <CandlestickChart />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Trade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="pair" className="text-sm font-medium">
                          Trading Pair
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pair" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="btcusdt">BTC/USDT</SelectItem>
                            <SelectItem value="ethusdt">ETH/USDT</SelectItem>
                            <SelectItem value="bnbusdt">BNB/USDT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="amount" className="text-sm font-medium">
                          Amount
                        </label>
                        <Input id="amount" type="number" placeholder="0.00" />
                      </div>
                      <div className="flex space-x-2">
                        <Button className="flex-1">Buy</Button>
                        <Button className="flex-1" variant="outline">
                          Sell
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Open Positions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { pair: "BTC/USDT", amount: 0.5, entryPrice: 45000, currentPrice: 46500, pnl: 750 },
                      { pair: "ETH/USDT", amount: 2, entryPrice: 3000, currentPrice: 2950, pnl: -100 },
                    ].map((position, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{position.pair}</div>
                          <div className="text-sm text-muted-foreground">
                            Amount: {position.amount} • Entry: ${position.entryPrice}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${position.currentPrice}</div>
                          <div className={`text-sm ${position.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {position.pnl >= 0 ? "+" : ""}
                            {position.pnl} USD
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Sentiment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Bitcoin (BTC)</span>
                          <span className="text-sm font-medium text-green-500">Bullish</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Ethereum (ETH)</span>
                          <span className="text-sm font-medium text-yellow-500">Neutral</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Binance Coin (BNB)</span>
                          <span className="text-sm font-medium text-red-500">Bearish</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Volume Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsBarChart data={volumeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="BTC" fill="#f7931a" />
                        <Bar dataKey="ETH" fill="#627eea" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>AI-Powered Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Bitcoin Breakout Potential</h4>
                        <p className="text-sm text-muted-foreground">
                          Our AI models indicate a 75% probability of BTC breaking the $50,000 resistance level within
                          the next 7 days.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Ethereum Gas Fees Trend</h4>
                        <p className="text-sm text-muted-foreground">
                          Analysis suggests Ethereum gas fees are likely to decrease by 15-20% following the upcoming
                          network upgrade.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Crypto Trading Basics</h4>
                        <p className="text-sm text-muted-foreground">
                          Learn the fundamentals of cryptocurrency trading
                        </p>
                        <Button variant="link" className="px-0">
                          Start Course
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <BarChart className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Advanced Technical Analysis</h4>
                        <p className="text-sm text-muted-foreground">Master chart patterns and indicators</p>
                        <Button variant="link" className="px-0">
                          Start Course
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <Wallet className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Risk Management Strategies</h4>
                        <p className="text-sm text-muted-foreground">Learn how to protect your investments</p>
                        <Button variant="link" className="px-0">
                          Start Course
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Latest Market Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "The Impact of DeFi on Traditional Finance", date: "2023-05-15" },
                      { title: "Understanding Blockchain Scalability Solutions", date: "2023-05-10" },
                      { title: "Crypto Regulations: A Global Perspective", date: "2023-05-05" },
                    ].map((article, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{article.title}</h4>
                          <p className="text-sm text-muted-foreground">{article.date}</p>
                        </div>
                        <Button variant="ghost">Read</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

