"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings } from "lucide-react"

interface IndicatorSettingsProps {
  indicator: {
    name: string
    value: string
  }
  onUpdate: (settings: any) => void
  onRemove: () => void
}

export function IndicatorSettings({ indicator, onUpdate, onRemove }: IndicatorSettingsProps) {
  const [settings, setSettings] = useState({
    period: "14",
    source: "close",
    color: "#2563eb",
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
          <Settings className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{indicator.name} Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="period" className="text-right">
              Period
            </Label>
            <Input
              id="period"
              value={settings.period}
              onChange={(e) => setSettings({ ...settings, period: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="source" className="text-right">
              Source
            </Label>
            <Select value={settings.source} onValueChange={(value) => setSettings({ ...settings, source: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="close">Close</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="hl2">(H+L)/2</SelectItem>
                <SelectItem value="hlc3">(H+L+C)/3</SelectItem>
                <SelectItem value="ohlc4">(O+H+L+C)/4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Color
            </Label>
            <Input
              id="color"
              type="color"
              value={settings.color}
              onChange={(e) => setSettings({ ...settings, color: e.target.value })}
              className="col-span-3 h-8"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="destructive" onClick={onRemove}>
            Remove
          </Button>
          <Button onClick={() => onUpdate(settings)}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

