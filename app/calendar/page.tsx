"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, CalendarIcon, Filter } from "lucide-react"

// Sample market events
const marketEvents = [
  {
    date: new Date(2025, 0, 25),
    events: [
      { title: "BTC Halving", type: "major", time: "14:00 UTC", description: "Bitcoin block reward halving event" },
      {
        title: "ETH Network Upgrade",
        type: "major",
        time: "16:00 UTC",
        description: "Ethereum network protocol upgrade",
      },
    ],
  },
  {
    date: new Date(2025, 0, 26),
    events: [
      {
        title: "Market Analysis Report",
        type: "regular",
        time: "10:00 UTC",
        description: "Weekly market analysis report release",
      },
    ],
  },
  {
    date: new Date(2025, 0, 27),
    events: [
      {
        title: "Fed Interest Rate Decision",
        type: "economic",
        time: "18:00 UTC",
        description: "Federal Reserve interest rate announcement",
      },
      {
        title: "BNB Quarterly Burn",
        type: "tokenomics",
        time: "12:00 UTC",
        description: "Binance quarterly BNB token burn event",
      },
    ],
  },
]

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"calendar" | "list">("calendar")
  const [filter, setFilter] = useState<string>("all")

  const selectedDateEvents = marketEvents.find((e) => e.date.toDateString() === date?.toDateString())

  const filteredEvents = marketEvents.flatMap((day) =>
    day.events.filter((event) => filter === "all" || event.type === filter),
  )

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Market Calendar</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setView("calendar")}>
            <CalendarIcon className="w-4 h-4 mr-2" />
            Calendar View
          </Button>
          <Button variant="outline" onClick={() => setView("list")}>
            <Filter className="w-4 h-4 mr-2" />
            List View
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Set Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Event Alert</DialogTitle>
                <DialogDescription>Choose an event and set a reminder for it.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event" className="text-right">
                    Event
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredEvents.map((event, index) => (
                        <SelectItem key={index} value={event.title}>
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reminder" className="text-right">
                    Reminder
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Set reminder time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes before</SelectItem>
                      <SelectItem value="15">15 minutes before</SelectItem>
                      <SelectItem value="30">30 minutes before</SelectItem>
                      <SelectItem value="60">1 hour before</SelectItem>
                      <SelectItem value="1440">1 day before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit">Set Alert</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="major">Major Events</SelectItem>
                <SelectItem value="economic">Economic Events</SelectItem>
                <SelectItem value="tokenomics">Tokenomics Events</SelectItem>
                <SelectItem value="regular">Regular Events</SelectItem>
              </SelectContent>
            </Select>

            <div className="mt-6">
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Events</CardTitle>
          </CardHeader>
          <CardContent>
            {view === "calendar" ? (
              <div className="space-y-4">
                {selectedDateEvents ? (
                  selectedDateEvents.events.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                        <p className="text-sm">{event.description}</p>
                      </div>
                      <Badge variant={event.type === "major" ? "destructive" : "secondary"}>{event.type}</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No events scheduled for this date.</p>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event, index) => (
                    <TableRow key={index}>
                      <TableCell>{event.date?.toLocaleDateString()}</TableCell>
                      <TableCell>{event.title}</TableCell>
                      <TableCell>
                        <Badge variant={event.type === "major" ? "destructive" : "secondary"}>{event.type}</Badge>
                      </TableCell>
                      <TableCell>{event.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Historical Data Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Historical Event Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Market Impact</TableHead>
                <TableHead>Price Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Previous BTC Halving</TableCell>
                <TableCell>May 11, 2020</TableCell>
                <TableCell>Bullish</TableCell>
                <TableCell className="text-green-500">+38% (30 days after)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ETH London Hard Fork</TableCell>
                <TableCell>August 5, 2021</TableCell>
                <TableCell>Bullish</TableCell>
                <TableCell className="text-green-500">+26% (30 days after)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fed Rate Hike</TableCell>
                <TableCell>March 16, 2022</TableCell>
                <TableCell>Bearish</TableCell>
                <TableCell className="text-red-500">-12% (7 days after)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

