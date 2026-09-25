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
  X,
  Sun,
  Moon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useTheme } from "@/hooks/use-theme"

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
  const { theme, toggleTheme } = useTheme()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-ring">
            <Image src="/images/logoipsum-419.png" alt="YisonBits" width={32} height={32} className="rounded-lg" />
            <span className="font-display text-lg font-bold tracking-tight">
              Yison<span className="text-foreground">Beats</span>
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2">
          <form onSubmit={handleSearch} className="hidden lg:flex relative items-center" role="search">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              name="q"
              aria-label="Rechercher un beat"
              placeholder="Rechercher un beat…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-64 rounded-lg border border-border bg-muted/40 pl-9 pr-4 text-sm transition-colors focus:border-foreground/40 focus:ring-2 focus:ring-ring/20"
            />
          </form>

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"} className="text-muted-foreground hover:text-foreground">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground" asChild>
            <Link href="/cart" aria-label={`Panier, ${totalCount} article${totalCount > 1 ? "s" : ""}`}>
              <ShoppingCart className="h-5 w-5" />
              {totalCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary$ text-[10px] font-bold text-primary-foreground">
                  {totalCount}
                </span>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-foreground" asChild>
            <Link href="/account" aria-label="Mon compte">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/80 bg-background p-4 animate-in slide-in-from-top duration-300 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav aria-label="Navigation mobile" className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "rounded-lg px-4 py-3 text-base font-medium",
                  pathname === item.href ? "bg-accent text-foreground" : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 mt-1 border-t border-border flex flex-col gap-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="mr-2 h-5 w-5" aria-hidden="true" /> Compte
                </Link>
              </Button>
              <form onSubmit={handleSearch} className="relative" role="search">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <input
                  type="search"
                  name="q"
                  aria-label="Rechercher un beat"
                  placeholder="Rechercher…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border bg-muted/40 pl-9 pr-4 text-sm focus:border-foreground/40 focus:ring-2 focus:ring-ring/20"
                />
              </form>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}