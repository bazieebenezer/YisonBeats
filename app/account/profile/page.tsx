"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Phone, MapPin, Save } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight">Mon Profil</h2>
        <p className="text-muted-foreground">Gérez vos informations personnelles.</p>
      </div>

      <div className="flex items-center gap-6 p-6 rounded-2xl border bg-white">
        <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
          JB
        </div>
        <div>
          <h3 className="text-xl font-bold">Josias Bazie</h3>
          <p className="text-sm text-muted-foreground">Membre depuis Juillet 2026</p>
        </div>
      </div>

      <Card className="border-slate-100 rounded-2xl overflow-hidden">
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <User className="h-4 w-4" /> Prénom
              </label>
              <input type="text" className="h-11 w-full rounded-xl border bg-muted/30 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue="Josias" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <User className="h-4 w-4" /> Nom
              </label>
              <input type="text" className="h-11 w-full rounded-xl border bg-muted/30 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue="Bazie" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email
              </label>
              <input type="email" className="h-11 w-full rounded-xl border bg-muted/30 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue="josias@yisonbits.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Phone className="h-4 w-4" /> Téléphone
              </label>
              <input type="tel" className="h-11 w-full rounded-xl border bg-muted/30 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue="+226 00 00 00 00" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Localisation
              </label>
              <input type="text" className="h-11 w-full rounded-xl border bg-muted/30 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue="Ouagadougou, Burkina Faso" />
            </div>
          </div>
          <div className="pt-4 border-t">
            <Button className="gap-2"><Save className="h-4 w-4" /> Enregistrer les modifications</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
