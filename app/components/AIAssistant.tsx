"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I assist you with your crypto analysis today?" }
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }])
      setInput("")
      // Here you would typically send the input to your AI backend and get a response
      // For this example, we'll just simulate a response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "assistant", content: "I'm analyzing your request. Please give me a moment." }])
      }, 1000)
    }
  }

  return (
    <section id="ai-assistant" className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">AI Assistant</h2>
        <Card className="w-full max-w-2xl mx-auto bg-gray-800">
          <CardHeader>
            <CardTitle>Chat with BlockInsightPro AI</CardTitle>
            <CardDescription>Ask questions about crypto trends, analysis, and predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 h-80 overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`rounded-lg p-2 max-w-[70%] ${message.role === "user" ? "bg-blue-600" : "bg-gray-700"}`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full space-x-2">
              <Input 
                placeholder="Type your message here..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

