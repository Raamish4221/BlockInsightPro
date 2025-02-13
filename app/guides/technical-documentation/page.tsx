import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TechnicalDocumentation() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link href="/help">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Help Center
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8">Technical Documentation</h1>
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                BlockInsightPro provides a RESTful API for developers to integrate our AI-powered analysis into their
                own applications.
              </p>
              <h3 className="text-xl font-semibold mb-2">Base URL</h3>
              <p className="mb-4">https://api.blockinsightpro.com/v1</p>
              <h3 className="text-xl font-semibold mb-2">Authentication</h3>
              <p className="mb-4">
                All API requests require an API key to be included in the header:
                <br />
                <code className="bg-muted p-1 rounded">X-API-Key: YOUR_API_KEY</code>
              </p>
              <h3 className="text-xl font-semibold mb-2">Endpoints</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>/market/analysis - Get AI-powered market analysis</li>
                <li>/predictions/short-term - Retrieve short-term price predictions</li>
                <li>/signals/trading - Fetch AI-generated trading signals</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>WebSocket Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                For real-time updates, BlockInsightPro offers WebSocket connections for streaming data.
              </p>
              <h3 className="text-xl font-semibold mb-2">WebSocket URL</h3>
              <p className="mb-4">wss://ws.blockinsightpro.com</p>
              <h3 className="text-xl font-semibold mb-2">Available Streams</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>market.ticker - Real-time market data updates</li>
                <li>ai.signals - Live AI-generated trading signals</li>
                <li>predictions.updates - Updates to AI predictions</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Data Models</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Understanding the structure of our data models is crucial for effective integration.
              </p>
              <h3 className="text-xl font-semibold mb-2">Market Analysis Model</h3>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {`{
  "timestamp": "2023-05-15T10:30:00Z",
  "symbol": "BTC/USDT",
  "price": 45000,
  "sentiment": "bullish",
  "confidence": 0.85,
  "indicators": {
    "rsi": 65,
    "macd": {
      "value": 100,
      "signal": 80,
      "histogram": 20
    }
  }
}`}
              </pre>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Error Handling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our API uses standard HTTP response codes to indicate the success or failure of requests.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>200 - OK: The request was successful</li>
                <li>400 - Bad Request: The request was invalid or cannot be served</li>
                <li>401 - Unauthorized: The request requires authentication</li>
                <li>403 - Forbidden: The server understood the request but refuses to authorize it</li>
                <li>404 - Not Found: The requested resource could not be found</li>
                <li>500 - Internal Server Error: The server encountered an unexpected condition</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

