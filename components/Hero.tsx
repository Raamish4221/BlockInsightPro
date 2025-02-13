import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to BlockInsightPro</h1>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Harness the power of AI for advanced crypto analysis and insights. 
        Stay ahead of the market with our cutting-edge tools and expert AI predictions.
      </p>
      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 button-hover">Get Started</Button>
    </section>
  )
}

