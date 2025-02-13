"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoonIcon, SunIcon, Menu, Search, X } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8 rounded-full bg-primary/20 border border-primary/50 transition-all duration-300 hover:bg-primary/30 hover:border-primary group">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm group-hover:blur-md transition-all duration-300"></div>
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:inline">BlockInsightPro</span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-lg text-foreground hover:bg-primary/20 transition-all duration-300"
              >
                Dashboard
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300">
                      Market
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/market" className="block p-2 hover:bg-primary/10 rounded-md transition-colors">
                              Market Overview
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/chart" className="block p-2 hover:bg-primary/10 rounded-md transition-colors">
                              Chart
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/liquidation-heatmap"
                              className="block p-2 hover:bg-primary/10 rounded-md transition-colors"
                            >
                              Liquidation Heatmap
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link
                href="/news"
                className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300"
              >
                News
              </Link>
              <Link
                href="/community"
                className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300"
              >
                Community
              </Link>
              <Link
                href="/portfolio"
                className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300"
              >
                Portfolio
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8 bg-background/50 border-primary/20 focus:border-primary transition-all duration-300 placeholder:text-muted-foreground"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground hover:bg-primary/20 transition-all duration-300"
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  Sign Up
                </Button>
              </Link>
            </div>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300"
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navigate through BlockInsightPro</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/dashboard"
                    className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/market"
                    className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Market
                  </Link>
                  <Link
                    href="/news"
                    className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    News
                  </Link>
                  <Link
                    href="/chart"
                    className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Chart
                  </Link>
                  <Link
                    href="/liquidation-heatmap"
                    className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Liquidation Heatmap
                  </Link>
                  <Link
                    href="/community"
                    className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Community
                  </Link>
                  <Link
                    href="/portfolio"
                    className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Portfolio
                  </Link>
                  <div className="pt-4">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full mb-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

