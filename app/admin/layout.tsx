"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart3, 
  Package, 
  Settings, 
  Users, 
  MessageSquare,
  Plus,
  ArrowUpRight,
  Search,
  MoreHorizontal,
  Sun,
  Moon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { name: "Vue d'ensemble", href: "/admin", icon: BarChart3 },
    { name: "Produits", href: "/admin/products", icon: Package },
    { name: "Services", href: "/admin/services", icon: MessageSquare },
    { name: "Clients", href: "/admin/customers", icon: Users },
    { name: "Paramètres", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-background hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-tight">
              Yi<span className="text-primary">sonBits</span>
            </span>
            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-lg font-bold uppercase tracking-widest">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-accent text-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="h-4 w-4" aria-hidden="true" />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border/60">
          <div className="p-4 rounded-xl bg-muted/60 border space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Version</p>
            <p className="text-sm font-bold">YIsonBits v1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-border/60 bg-background/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <input
              type="text"
              aria-label="Rechercher une commande, un produit"
              placeholder="Rechercher une commande, un produit…"
              className="h-9 w-full rounded-lg border-none bg-muted pl-10 pr-4 text-xs focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={mounted && theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
              className="text-muted-foreground hover:text-foreground"
            >
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" aria-hidden="true" /> Nouveau produit
            </Button>
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              JB
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
