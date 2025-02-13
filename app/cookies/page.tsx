import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <Card>
        <CardHeader>
          <CardTitle>Cookie Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-gray dark:prose-invert max-w-none">
          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit our website.
            They help us provide you with a better experience by remembering your preferences and settings.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>BlockInsightPro uses cookies for the following purposes:</p>
          <ul>
            <li>Essential cookies for platform functionality</li>
            <li>Theme preferences (light/dark mode)</li>
            <li>Session management</li>
            <li>Usage analytics for project evaluation</li>
          </ul>

          <h2>3. Cookie Types</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Essential Cookies</h3>
              <p>Required for basic platform functionality</p>
            </div>
            <div>
              <h3 className="font-semibold">Preference Cookies</h3>
              <p>Remember your settings and preferences</p>
            </div>
            <div>
              <h3 className="font-semibold">Analytics Cookies</h3>
              <p>Help us understand how the platform is used</p>
            </div>
          </div>

          <h2>4. Managing Cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
            computer and you can set most browsers to prevent them from being placed.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

