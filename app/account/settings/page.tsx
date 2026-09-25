"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Lock, Globe, Eye, EyeOff, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/use-theme"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight">Paramètres</h2>
        <p className="text-muted-foreground">Gérez vos préférences et la sécurité de votre compte.</p>
      </div>

      <Card className="border-border/60  rounded-xl overflow-hidden">
        <CardContent className="p-8 space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Bell className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-lg">Notifications</h3>
            </div>
            <div className="space-y-4 ml-14">
              {["Nouveaux beats", "Offres promotionnelles", "Confirmations de commande", "Newsletter"].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary placeholder:text-muted-foreground" />
                  <span className="text-sm font-medium">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t pt-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Lock className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-lg">Sécurité</h3>
            </div>
            <div className="space-y-4 ml-14">
              <div className="space-y-2">
                <label htmlFor="mot-de-passe-actuel" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Mot de passe actuel</label>
                <div className="relative">
                  <input id="mot-de-passe-actuel" name="mot-de-passe-actuel" type="password" className="h-11 w-full rounded-lg border border-border bg-muted/50 px-4 pr-10 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground" placeholder="********" />
                  <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" aria-hidden="true" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="nouveau-mot-de-passe" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Nouveau mot de passe</label>
                <input id="nouveau-mot-de-passe" name="nouveau-mot-de-passe" type="password" className="h-11 w-full rounded-lg border border-border bg-muted/50 px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground" placeholder="Nouveau mot de passe" />
              </div>
              <Button variant="outline" size="sm" className="rounded-lg">Mettre à jour le mot de passe</Button>
            </div>
          </div>

          <div className="border-t pt-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Globe className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-lg">Préférences</h3>
            </div>
            <div className="space-y-4 ml-14">
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest block">Thème d&apos;affichage</label>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    aria-pressed={theme === "light"}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors",
                      theme === "light"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Sun className="h-4 w-4" aria-hidden="true" />
                    Mode clair
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    aria-pressed={theme === "dark"}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors",
                      theme === "dark"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Moon className="h-4 w-4" aria-hidden="true" />
                    Mode sombre
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="langue" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Langue</label>
                <select id="langue" className="h-11 w-full max-w-xs rounded-lg border border-border bg-muted/50 px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20">
                  <option>Français</option>
                  <option>English</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="devise" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Devise</label>
                <select id="devise" className="h-11 w-full max-w-xs rounded-lg border border-border bg-muted/50 px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20">
                  <option>FCFA (XOF)</option>
                  <option>Euro (EUR)</option>
                  <option>US Dollar (USD)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 flex justify-end">
            <Button className="gap-2 rounded-lg">Enregistrer les paramètres</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
