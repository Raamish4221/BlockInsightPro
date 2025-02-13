import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <Card>
        <CardHeader>
          <CardTitle>Terms of Use</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-gray dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to BlockInsightPro. This is a university final year project demonstrating the capabilities of
            AI-powered crypto analysis. These terms of use are created to ensure proper usage of the platform for
            educational purposes.
          </p>

          <h2>2. Educational Purpose</h2>
          <p>
            This platform is developed as an academic project and should be used accordingly. The analysis, predictions,
            and insights provided are for demonstration purposes only and should not be considered as financial advice.
          </p>

          <h2>3. User Responsibilities</h2>
          <ul>
            <li>Use the platform responsibly and ethically</li>
            <li>Do not attempt to manipulate or abuse the system</li>
            <li>Respect the intellectual property rights of the project</li>
            <li>Report any bugs or issues found during usage</li>
          </ul>

          <h2>4. Disclaimer</h2>
          <p>
            This is a student project and should not be used for actual trading or investment decisions. The creators
            are not responsible for any financial decisions made based on the platform's analysis.
          </p>

          <h2>5. Data Usage</h2>
          <p>
            Any data collected through this platform is used solely for educational and demonstration purposes. Personal
            information, if any, will be handled according to our Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

