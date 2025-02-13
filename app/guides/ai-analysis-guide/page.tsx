import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AIAnalysisGuide() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link href="/help">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Help Center
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8">AI Analysis Guide</h1>
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Understanding AI Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our AI predictions are based on advanced machine learning models that analyze vast amounts of market
                data, including price movements, trading volumes, social sentiment, and on-chain metrics.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Short-term predictions: Focused on price movements within the next 24-48 hours.</li>
                <li>Medium-term predictions: Analyze trends over the next 1-4 weeks.</li>
                <li>Long-term predictions: Provide insights into potential market directions over 1-6 months.</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Interpreting AI Signals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">AI signals are categorized into three main types:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Bullish: Indicating potential upward price movement.</li>
                <li>Bearish: Suggesting possible downward price movement.</li>
                <li>Neutral: Signaling a period of consolidation or uncertainty.</li>
              </ul>
              <p className="mt-4">
                Each signal comes with a confidence score (0-100%) and supporting data points to help you make informed
                decisions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Using AI Analysis Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Select your desired cryptocurrency pair from the dropdown menu.</li>
                <li>Choose the timeframe for analysis (e.g., 1 day, 1 week, 1 month).</li>
                <li>Adjust additional parameters such as indicators or data sources if needed.</li>
                <li>Click "Run Analysis" to generate AI insights.</li>
                <li>Review the generated report, including price predictions, trend analysis, and key indicators.</li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Combining AI Insights with Technical Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                While AI predictions are powerful, it's essential to combine them with traditional technical analysis
                for a comprehensive trading strategy:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Use AI predictions as a starting point for your analysis.</li>
                <li>Confirm AI signals with chart patterns and technical indicators.</li>
                <li>Consider fundamental factors and news events that may impact the market.</li>
                <li>Always use proper risk management techniques, regardless of AI predictions.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

