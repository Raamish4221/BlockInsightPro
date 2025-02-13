"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, MessageSquare, HelpCircle, FileText, Book, Newspaper } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

// Sample FAQ data
const faqs = [
  {
    category: "Getting Started",
    items: [
      {
        question: "How do I create an account?",
        answer:
          "To create an account, click the 'Sign Up' button in the top right corner of the page. Fill in your email address, create a password, and follow the verification steps sent to your email.",
      },
      {
        question: "Is BlockInsightPro free to use?",
        answer:
          "BlockInsightPro offers both free and premium plans. The free plan includes basic features, while premium plans offer advanced AI analysis, real-time alerts, and more.",
      },
      {
        question: "How do I connect my crypto exchange?",
        answer:
          "Go to your Profile Settings, select 'Exchange Connections', and follow the API integration steps for your preferred exchange. We support major exchanges including Binance, Coinbase, and others.",
      },
    ],
  },
  {
    category: "AI Features",
    items: [
      {
        question: "How accurate are the AI predictions?",
        answer:
          "Our AI predictions have shown an average accuracy rate of 85% based on historical data. However, please note that all trading involves risk, and past performance doesn't guarantee future results.",
      },
      {
        question: "How often is the AI model updated?",
        answer:
          "Our AI models are continuously trained with new market data and updated every 24 hours to maintain accuracy and adapt to changing market conditions.",
      },
    ],
  },
  {
    category: "Account & Security",
    items: [
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Forgot Password' on the login page, enter your email address, and follow the reset instructions sent to your email.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes, we use industry-standard encryption and security measures to protect your data. We never store sensitive information like private keys or exchange API secrets.",
      },
    ],
  },
]

const guides = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of using BlockInsightPro",
    icon: Book,
  },
  {
    title: "AI Analysis Guide",
    description: "Understanding AI predictions and analysis",
    icon: HelpCircle,
  },
  {
    title: "Technical Documentation",
    description: "Detailed platform documentation",
    icon: FileText,
  },
  {
    title: "Latest Updates",
    description: "Recent changes and new features",
    icon: Newspaper,
  },
]

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate sending email
    toast.success("Support ticket submitted successfully! We'll get back to you soon.")
    setEmail("")
    setSubject("")
    setMessage("")
  }

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.items.length > 0)

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <div className="bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
            <p className="text-lg text-muted-foreground mb-8">Search our knowledge base or contact our support team</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for answers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12">
          {/* Quick Links */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((guide) => (
              <Link href={`/guides/${guide.title.toLowerCase().replace(/\s+/g, "-")}`} key={guide.title}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 neon-glow">
                  <CardContent className="p-6">
                    <guide.icon className="h-8 w-8 mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground">{guide.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* FAQs */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="w-full justify-start">
                      <TabsTrigger value="all">All</TabsTrigger>
                      {faqs.map((category) => (
                        <TabsTrigger key={category.category} value={category.category}>
                          {category.category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <TabsContent value="all" className="mt-6">
                      <Accordion type="single" collapsible className="w-full">
                        {filteredFaqs.map((category) =>
                          category.items.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                              <AccordionTrigger>{item.question}</AccordionTrigger>
                              <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                          )),
                        )}
                      </Accordion>
                    </TabsContent>
                    {faqs.map((category) => (
                      <TabsContent key={category.category} value={category.category} className="mt-6">
                        <Accordion type="single" collapsible className="w-full">
                          {category.items.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                              <AccordionTrigger>{item.question}</AccordionTrigger>
                              <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Describe your issue..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[150px]"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-8 h-8 rounded-full p-2">
                        <Mail className="h-4 w-4" />
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">Email Us</p>
                        <p className="text-sm text-muted-foreground">support@blockinsightpro.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-8 h-8 rounded-full p-2">
                        <MessageSquare className="h-4 w-4" />
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">Live Chat</p>
                        <p className="text-sm text-muted-foreground">Available 24/7</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-8 h-8 rounded-full p-2">
                        <Phone className="h-4 w-4" />
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">Phone Support</p>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .neon-glow {
          transition: all 0.3s ease-in-out;
        }
        .neon-glow:hover {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4), 0 0 45px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  )
}

