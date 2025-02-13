import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-gray dark:prose-invert max-w-none">
          <h2>1. Overview</h2>
          <p>
            This Privacy Policy explains how BlockInsightPro collects and uses information through our platform. As this
            is a university project, we prioritize transparency and data protection.
          </p>

          <h2>2. Information Collection</h2>
          <p>We collect minimal information necessary for the demonstration of this project:</p>
          <ul>
            <li>Basic account information (if you create an account)</li>
            <li>Usage data for platform improvement</li>
            <li>Feedback and communications</li>
          </ul>

          <h2>3. Data Usage</h2>
          <p>The collected information is used exclusively for:</p>
          <ul>
            <li>Project demonstration purposes</li>
            <li>Platform functionality improvement</li>
            <li>Academic research and development</li>
          </ul>

          <h2>4. Data Protection</h2>
          <p>
            We implement appropriate security measures to protect your information. However, as this is an educational
            project, we recommend not using sensitive or real personal information.
          </p>

          <h2>5. Contact</h2>
          <p>
            For any privacy-related questions or concerns, please contact the project team through the provided
            communication channels.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

