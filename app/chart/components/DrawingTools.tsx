"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Ruler, Lock, Pencil, Star, LineChart, GitBranch, Hash } from "lucide-react"
import { cn } from "@/lib/utils"

interface DrawingTool {
  id: string
  name: string
  icon: React.ElementType
  category: "main" | "trend" | "fibonacci" | "patterns"
}

const drawingTools: Record<string, DrawingTool[]> = {
  main: [
    { id: "measure", name: "Measure", icon: Ruler, category: "main" },
    { id: "lock", name: "Lock", icon: Lock, category: "main" },
    { id: "drawing", name: "Drawing", icon: Pencil, category: "main" },
    { id: "favorite", name: "Favorite", icon: Star, category: "main" },
  ],
  trend: [
    { id: "trendLine", name: "Trend Line", icon: LineChart, category: "trend" },
    { id: "ray", name: "Ray", icon: GitBranch, category: "trend" },
    { id: "infoLine", name: "Info Line", icon: Hash, category: "trend" },
  ],
}

export function DrawingTools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId === selectedTool ? null : toolId)
    setIsDrawing(toolId === "drawing")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Pencil className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Drawing Tools</SheetTitle>
          <SheetDescription>Select a tool to start drawing on the chart</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-4 gap-2">
            {drawingTools.main.map((tool) => (
              <Button
                key={tool.id}
                variant="ghost"
                className={cn(
                  "flex flex-col items-center justify-center p-2 h-auto aspect-square",
                  selectedTool === tool.id && "bg-primary/20",
                )}
                onClick={() => handleToolSelect(tool.id)}
              >
                <tool.icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{tool.name}</span>
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium tracking-wide text-muted-foreground">TREND LINES</h3>
            <div className="grid grid-cols-3 gap-2">
              {drawingTools.trend.map((tool) => (
                <Button
                  key={tool.id}
                  variant="ghost"
                  className={cn(
                    "flex flex-col items-center justify-center p-2 h-auto aspect-square",
                    selectedTool === tool.id && "bg-primary/20",
                  )}
                  onClick={() => handleToolSelect(tool.id)}
                >
                  <tool.icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{tool.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {selectedTool && (
            <div className="p-4 bg-card rounded-lg border">
              <p className="text-sm">
                {selectedTool === "drawing"
                  ? "Click and drag on the chart to draw"
                  : `Selected: ${
                      drawingTools[
                        Object.keys(drawingTools).find((category) =>
                          drawingTools[category].some((tool) => tool.id === selectedTool),
                        ) || "main"
                      ].find((tool) => tool.id === selectedTool)?.name
                    }`}
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

