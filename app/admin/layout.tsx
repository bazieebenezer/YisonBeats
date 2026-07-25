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
  MoreHorizontal
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navLinks = [
    { name: "Vue d'ensemble", href: "/admin", icon: BarChart3 },
    { name: "Produits", href: "/admin/products", icon: Package },
    { name: "Services", href: "/admin/services", icon: MessageSquare },
    { name: "Clients", href: "/admin/customers", icon: Users },
    { name: "Paramètres", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-tight">
              YI<span className="text-primary">sonBits</span>
            </span>
            <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest">Admin</span>
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
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition-all",
                  isActive 
                    ? "bg-navy text-white" 
                    : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="p-4 rounded-xl bg-slate-50 border space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Version</p>
            <p className="text-sm font-bold">YIsonBits v1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Rechercher une commande, un produit..." 
              className="h-9 w-full rounded-lg border-none bg-slate-100 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Nouveau Produit
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
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
