import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-secondary py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-muted-foreground mb-4 md:mb-0">
          © 2023 BlockInsightPro. All rights reserved.
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Privacy Policy</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Terms of Service</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Contact Us</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

