"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, Menu } from 'lucide-react'
import Link from "next/link"
import { useTheme } from "next-themes"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative size-8 rounded-full bg-primary/20 border border-primary/50 transition-all duration-300 hover:bg-primary/30 hover:border-primary group">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm group-hover:blur-md transition-all duration-300"></div>
              </div>
              <span className="text-xl font-bold gradient-text">BlockInsightPro</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              <Link href="/dashboard" className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300">
                Dashboard
              </Link>
              <Link href="/market" className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300">
                Market
              </Link>
              <Link href="/ai-predictions" className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300">
                AI Predictions
              </Link>
              <Link href="/portfolio" className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300">
                Portfolio
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300"
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                >
                  Sign Up
                </Button>
              </Link>
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

