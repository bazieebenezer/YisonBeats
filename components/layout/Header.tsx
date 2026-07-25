"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { 
  ShoppingCart, 
  Search, 
  User, 
  Menu, 
  X 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Boutique", href: "/shop" },
  { name: "Services", href: "/services" },
  { name: "À propos", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const pathname = usePathname()
  const router = useRouter()
  const { totalCount } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 ">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logoipsum-custom-logo.svg" alt="YisonBits" width={32} height={32} className="rounded-lg" />
            <span className="font-display text-xl font-bold tracking-tight">YisonBeats</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <form onSubmit={handleSearch} className="hidden lg:flex relative items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Rechercher un beat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-64 rounded-full border bg-muted/50 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </form>

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {totalCount}
                </span>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-lg font-medium py-2",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t flex flex-col gap-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="mr-2 h-5 w-5" /> Compte
                </Link>
              </Button>
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 w-full rounded-md border bg-muted/50 pl-10 pr-4 text-sm"
                />
              </form>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
