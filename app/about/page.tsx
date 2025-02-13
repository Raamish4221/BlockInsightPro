import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>About BlockInsightPro</CardTitle>
              <Badge>University Project</Badge>
            </div>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <div className="mb-8">
              <Image
                src="/placeholder.svg"
                alt="Project Overview"
                width={800}
                height={400}
                className="rounded-lg w-full"
              />
            </div>

            <h2>Project Overview</h2>
            <p>
              BlockInsightPro is a final year university project that demonstrates the potential of artificial
              intelligence in cryptocurrency market analysis. Our platform combines modern web technologies with AI
              algorithms to provide insightful market analysis and predictions.
            </p>

            <h2>Project Goals</h2>
            <ul>
              <li>Demonstrate practical applications of AI in financial markets</li>
              <li>Create an intuitive interface for crypto market analysis</li>
              <li>Implement real-time data processing and visualization</li>
              <li>Showcase modern web development practices</li>
            </ul>

            <h2>Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 not-prose mb-8">
              {["Next.js", "React", "TypeScript", "TailwindCSS", "AI/ML Models", "WebSocket", "Chart.js", "Prisma"].map(
                (tech) => (
                  <div key={tech} className="flex items-center justify-center p-4 border rounded-lg">
                    {tech}
                  </div>
                ),
              )}
            </div>

            <h2>Academic Context</h2>
            <p>
              This project was developed as part of a Computer Science degree program, focusing on the intersection of
              artificial intelligence, blockchain technology, and modern web development. It serves as a practical
              demonstration of these concepts working together in a real-world application.
            </p>

            <h2>Future Development</h2>
            <p>
              While this is an academic project, we continue to improve and expand its capabilities. We welcome feedback
              and suggestions from users and the academic community.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

