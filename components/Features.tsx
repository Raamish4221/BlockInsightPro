import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Brain, TrendingUp } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Advanced Analytics",
      description: "Deep dive into crypto trends with our powerful analytical tools."
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI-Powered Insights",
      description: "Get intelligent predictions and recommendations from our AI models."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Real-time Market Data",
      description: "Stay updated with live market information and price movements."
    }
  ]

  return (
    <section id="features" className="py-20 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {feature.icon}
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

