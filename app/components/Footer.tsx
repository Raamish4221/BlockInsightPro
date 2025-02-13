import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-400 mb-4 md:mb-0">
          © 2023 BlockInsightPro. All rights reserved.
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link></li>
            <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link></li>
            <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Contact Us</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

