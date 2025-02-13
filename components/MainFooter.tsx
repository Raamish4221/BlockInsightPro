import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Twitter, Github, DiscIcon as Discord } from "lucide-react"

const footerLinks = {
  features: {
    title: "Features",
    links: [
      { name: "AI Analysis", href: "/ai-analysis" },
      { name: "Market Scanner", href: "/scanner" },
      { name: "Portfolio Tracker", href: "/portfolio" },
      { name: "Trading Signals", href: "/trading-signals" },
      { name: "Market Calendar", href: "/calendar" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "About", href: "/about" },
      { name: "Documentation", href: "/docs" },
      { name: "Community", href: "/community" },
      { name: "Help Center", href: "/help" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Terms of Use", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/blockinsightpro" },
  { icon: Discord, href: "https://discord.gg/blockinsightpro" },
  { icon: Github, href: "https://github.com/blockinsightpro" },
]

export function MainFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} id={key === "features" ? "features" : undefined}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50" />
              <span className="text-xl font-bold">BlockInsightPro</span>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {socialLinks.map((social) => (
                <Button
                  key={social.href}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-primary"
                  asChild
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} BlockInsightPro. All rights reserved.</p>
            <p className="mt-1">A Final Year Project - University Demo</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

