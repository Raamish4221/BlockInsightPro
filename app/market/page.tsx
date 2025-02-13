"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/Header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const marketData = [
  { name: "Dow Jones", last: "42,086.40", high: "42,281.08", low: "42,054.82", chg: "-39.25", chgPercent: "-0.09%" },
  { name: "S&P 500", last: "5,724.51", high: "5,734.41", low: "5,699.16", chg: "+5.94", chgPercent: "+0.10%" },
  { name: "Nasdaq", last: "18,052.59", high: "18,091.96", low: "17,863.38", chg: "+78.32", chgPercent: "+0.44%" },
]

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4 pt-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Live Market Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Last</TableHead>
                    <TableHead>High</TableHead>
                    <TableHead>Low</TableHead>
                    <TableHead>Chg</TableHead>
                    <TableHead>Chg%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketData.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.last}</TableCell>
                      <TableCell>{item.high}</TableCell>
                      <TableCell>{item.low}</TableCell>
                      <TableCell className={item.chg.startsWith("+") ? "text-green-500" : "text-red-500"}>
                        {item.chg}
                      </TableCell>
                      <TableCell className={item.chgPercent.startsWith("+") ? "text-green-500" : "text-red-500"}>
                        {item.chgPercent}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">FOMC Meeting</p>
                    <p className="text-sm text-muted-foreground">Federal Reserve</p>
                  </div>
                  <p className="text-sm">Mar 20</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">GDP Release</p>
                    <p className="text-sm text-muted-foreground">US Economy</p>
                  </div>
                  <p className="text-sm">Mar 22</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exchange Long/Short Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>BTC</span>
                  <div className="w-2/3 bg-muted rounded-full h-2 overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: "49.72%" }} />
                  </div>
                  <span>49.72%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ETH</span>
                  <div className="w-2/3 bg-muted rounded-full h-2 overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: "51.28%" }} />
                  </div>
                  <span>51.28%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

