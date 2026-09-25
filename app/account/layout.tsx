"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Download, 
  ShoppingBag, 
  User, 
  LogOut,
  Settings,
  ShieldCheck
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const sidebarLinks = [
    { name: "Tableau de bord", href: "/account", icon: LayoutDashboard },
    { name: "Mes téléchargements", href: "/account/downloads", icon: Download },
    { name: "Mes commandes", href: "/account/orders", icon: ShoppingBag },
    { name: "Profil", href: "/account/profile", icon: User },
    { name: "Paramètres", href: "/account/settings", icon: Settings },
  ]

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold tracking-tight">Mon Compte</h1>
            <p className="text-sm text-muted-foreground">Bienvenue, Josias !</p>
          </div>

          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all",
                    isActive 
                      ? "bg-primary text-primary-foreground " 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {link.name}
                </Link>
              )
            })}
            <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all mt-4">
              <LogOut className="h-5 w-5" aria-hidden="true" />
              Déconnexion
            </button>
          </nav>

          <div className="p-6 rounded-xl bg-muted/60 border flex flex-col items-center text-center gap-4">
            <ShieldCheck className="h-10 w-10 text-primary" aria-hidden="true" />
            <p className="text-xs font-medium text-muted-foreground leading-relaxed">
              Votre compte est sécurisé. Toutes vos données sont cryptées.
            </p>
          </div>
        </aside>

        {/* Content */}
        <main className="lg:col-span-9">
          {children}
        </main>
      </div>
    </div>
  )
}
