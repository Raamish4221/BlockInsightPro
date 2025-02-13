"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/Header"
import { MainFooter } from "@/components/MainFooter"
import { ArrowRight, Users, Shield, Brain, ChevronDown, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AIVectorImage } from "@/components/AIVectorImage"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const features = [
  {
    id: "01",
    title: "AI-Powered Analysis",
    description: "Advanced AI algorithms analyze market trends and provide intelligent insights",
    icon: Brain,
    details:
      "Our cutting-edge AI algorithms process vast amounts of market data, including price movements, trading volumes, and social sentiment. This comprehensive analysis provides you with actionable insights to make informed trading decisions.",
  },
  {
    id: "02",
    title: "Smart Predictions",
    description: "Get AI-driven predictions and market sentiment analysis",
    icon: Users,
    details:
      "Leverage the power of machine learning to forecast market trends. Our smart prediction system combines historical data with real-time market indicators to provide accurate short-term and long-term predictions for various cryptocurrencies.",
  },
  {
    id: "03",
    title: "Secure & Reliable",
    description: "Enterprise-grade security with real-time market data integration",
    icon: Shield,
    details:
      "Your security is our top priority. We implement state-of-the-art encryption and security protocols to protect your data and transactions. Our platform integrates with trusted data sources to ensure you always have access to reliable, real-time market information.",
  },
]

export default function Home() {
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-24 md:pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold space-y-3">
                <span className="block">Best crypto</span>
                <span className="block text-gradient">AI analysis tool</span>
                <span className="block text-muted-foreground">for smart trading.</span>
              </h1>

              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <AIVectorImage key={i} seed={`user-${i}`} size={40} className="border-2 border-background" />
                  ))}
                </div>
                <div>
                  <span className="block font-bold">168K+</span>
                  <span className="text-sm text-muted-foreground">Active Traders</span>
                </div>
              </div>

              <Link href="/ai-analysis">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 neon-glow"
                >
                  Start Analysis <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="relative mt-12 lg:mt-0">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <div className="relative space-y-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/create%20an%20image%20for%20my%20landing%20page%20blockinsightpro%20tool%20for%20crypto%20assistance%20using%20ai%20that%20i%20can%20u%2026-01-2025%20at%2002-01-34-wfvrCky3p7spu5puXEBYIUAYE0ZAzR.jpeg"
                  alt="AI Trading Dashboard"
                  width={300}
                  height={600}
                  className="w-[300px] mx-auto floating rounded-2xl border border-primary/20 bg-card interactive-hover"
                  style={{
                    boxShadow: "0 0 30px rgba(59,130,246,0.3)",
                  }}
                />
                <div
                  className="absolute top-1/2 right-0 w-[200px] transform translate-x-1/2 -translate-y-1/2 floating hidden lg:block"
                  style={{ animationDelay: "1s" }}
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/create%20an%20image%20for%20my%20landing%20page%20blockinsightpro%20tool%20for%20crypto%20assistance%20using%20ai%20that%20i%20can%20u%2026-01-2025%20at%2002-01-34-wfvrCky3p7spu5puXEBYIUAYE0ZAzR.jpeg"
                    alt="AI Trading Interface"
                    width={200}
                    height={400}
                    className="w-full rounded-2xl border border-primary/20 bg-card floating interactive-hover"
                    style={{
                      boxShadow: "0 0 30px rgba(59,130,246,0.3)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Your <span className="text-gradient">AI assistant</span> for crypto trading.
            </h2>
            <p className="text-muted-foreground">
              Harness the power of artificial intelligence for smarter trading decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Dialog
                key={feature.id}
                open={openDialog === feature.id}
                onOpenChange={(open) => setOpenDialog(open ? feature.id : null)}
              >
                <DialogTrigger asChild>
                  <Card className="card-gradient border-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] interactive-hover cursor-pointer">
                    <CardContent className="p-6">
                      <div className="mb-4 text-primary text-lg font-bold">{feature.id}</div>
                      <feature.icon className="h-8 w-8 mb-4 text-primary" />
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                      <Button
                        variant="ghost"
                        className="mt-4 p-0 text-primary hover:text-primary/90 hover:bg-transparent transition-all duration-300 hover:translate-x-2"
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <feature.icon className="h-6 w-6 text-primary" />
                      {feature.title}
                    </DialogTitle>
                    <DialogDescription>{feature.details}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <Button className="w-full" onClick={() => setOpenDialog(null)}>
                      Close
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <Card className="relative card-gradient border-primary/10 interactive-hover">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl">AI Prediction Accuracy</span>
                      <span className="text-primary">+85.66%</span>
                    </div>
                    <div className="text-4xl font-bold text-gradient">$4,528 USD</div>
                    <div className="h-[400px] w-full bg-muted rounded-lg overflow-hidden relative">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-01-26%2001.47.24%20-%20A%20sleek%20and%20minimalistic%20portrait-style%20image%20designed%20for%20the%20landing%20page%20of%20a%20crypto%20analysis%20web%20app%20with%20AI.%20The%20design%20features%20a%20dark%20gradient%20-Op1btXemZu068zA8POXW2YLTjj6YNv.webp"
                        alt="AI Crypto Analysis Visualization"
                        width={600}
                        height={600}
                        className="w-full h-full object-cover rounded-lg"
                        priority
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                AI-Powered <span className="text-gradient">insights</span>
                <br />
                at your fingertips.
              </h2>
              <p className="text-muted-foreground mb-8">
                Our advanced AI algorithms analyze market trends, sentiment, and historical data to provide you with
                actionable insights for better trading decisions.
              </p>
              <Link href="#features">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 neon-glow"
                >
                  Explore Features <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our <span className="text-gradient">Community</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with fellow traders, share insights, and stay updated on the latest crypto trends.
            </p>
            <Link href="/community">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 neon-glow"
              >
                Join Community
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <MainFooter />

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-primary" />
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        .text-gradient {
          background: linear-gradient(45deg, #3b82f6, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .neon-glow:hover {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6), 0 0 45px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  )
}

