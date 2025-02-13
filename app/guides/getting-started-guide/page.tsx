import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GettingStartedGuide() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link href="/help">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Help Center
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8">Getting Started Guide</h1>
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Create Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Visit the BlockInsightPro homepage and click on the "Sign Up" button.</li>
                <li>Fill in your email address, create a strong password, and complete the registration form.</li>
                <li>Verify your email address by clicking the link sent to your inbox.</li>
                <li>Log in to your new account.</li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>2. Set Up Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Navigate to the "Profile" section in your account settings.</li>
                <li>Add a profile picture and fill in your bio.</li>
                <li>Set your preferred cryptocurrency pairs and default chart settings.</li>
                <li>Configure your notification preferences for market alerts.</li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>3. Explore the Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Familiarize yourself with the main dashboard layout.</li>
                <li>Customize your dashboard widgets to display the information most relevant to you.</li>
                <li>Learn how to use the quick-access tools for market analysis and trading signals.</li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>4. Connect Your First Exchange</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to the "Exchanges" section in your account settings.</li>
                <li>Choose your preferred cryptocurrency exchange from the list of supported platforms.</li>
                <li>Follow the step-by-step guide to securely connect your exchange API.</li>
                <li>Verify the connection and set up read-only permissions for added security.</li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>5. Start Your First Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Navigate to the "AI Analysis" section of the platform.</li>
                <li>Select a cryptocurrency pair you want to analyze.</li>
                <li>Choose the timeframe and specific indicators you're interested in.</li>
                <li>Run the analysis and interpret the AI-generated insights and predictions.</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

