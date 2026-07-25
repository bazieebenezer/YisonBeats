"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Lock, Globe, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight">Paramètres</h2>
        <p className="text-muted-foreground">Gérez vos préférences et la sécurité de votre compte.</p>
      </div>

      <Card className="border-slate-100 rounded-2xl overflow-hidden">
        <CardContent className="p-8 space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Bell className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg">Notifications</h3>
            </div>
            <div className="space-y-4 ml-14">
              {["Nouveaux beats", "Offres promotionnelles", "Confirmations de commande", "Newsletter"].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-sm font-medium">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t pt-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg">Sécurité</h3>
            </div>
            <div className="space-y-4 ml-14">
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Mot de passe actuel</label>
                <div className="relative">
                  <input type="password" className="h-11 w-full rounded-xl border bg-muted/30 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="********" />
                  <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Nouveau mot de passe</label>
                <input type="password" className="h-11 w-full rounded-xl border bg-muted/30 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Nouveau mot de passe" />
              </div>
              <Button variant="outline" size="sm">Mettre à jour le mot de passe</Button>
            </div>
          </div>

          <div className="border-t pt-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg">Préférences</h3>
            </div>
            <div className="space-y-4 ml-14">
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Langue</label>
                <select className="h-11 w-full max-w-xs rounded-xl border bg-muted/30 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Français</option>
                  <option>English</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Devise</label>
                <select className="h-11 w-full max-w-xs rounded-xl border bg-muted/30 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>FCFA (XOF)</option>
                  <option>Euro (EUR)</option>
                  <option>US Dollar (USD)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 flex justify-end">
            <Button className="gap-2">Enregistrer les paramètres</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
