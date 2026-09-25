"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Phone, MapPin, Save } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight">Mon profil</h2>
        <p className="text-muted-foreground">Gérez vos informations personnelles.</p>
      </div>

      <div className="flex items-center gap-6 p-6 rounded-xl border border-border/60 bg-card ">
        <div className="h-20 w-20 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold">
          JB
        </div>
        <div>
          <h3 className="text-xl font-bold">Josias Bazie</h3>
          <p className="text-sm text-muted-foreground">Membre depuis Juillet 2026</p>
        </div>
      </div>

      <Card className="border-border/60  rounded-xl overflow-hidden">
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="prenom" className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <User className="h-4 w-4" aria-hidden="true" /> Prénom
              </label>
              <input id="prenom" name="prenom" type="text" autoComplete="given-name" className="h-11 w-full rounded-lg border border-border bg-muted/50 px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground" defaultValue="Josias" />
            </div>
            <div className="space-y-2">
              <label htmlFor="nom" className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <User className="h-4 w-4" aria-hidden="true" /> Nom
              </label>
              <input id="nom" name="nom" type="text" autoComplete="family-name" className="h-11 w-full rounded-lg border border-border bg-muted/50 px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground" defaultValue="Bazie" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" /> Email
              </label>
              <input id="email" name="email" type="email" autoComplete="email" className="h-11 w-full rounded-lg border border-border bg-muted/50 px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground" defaultValue="josias@yisonbits.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="telephone" className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" /> Téléphone
              </label>
              <input id="telephone" name="telephone" type="tel" autoComplete="tel" className="h-11 w-full rounded-lg border border-border bg-muted/50 px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground" defaultValue="+226 00 00 00 00" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="localisation" className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Localisation
              </label>
              <input id="localisation" name="localisation" type="text" className="h-11 w-full rounded-lg border border-border bg-muted/50 px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground" defaultValue="Ouagadougou, Burkina Faso" />
            </div>
          </div>
          <div className="pt-4 border-t">
            <Button className="gap-2 rounded-lg"><Save className="h-4 w-4" aria-hidden="true" /> Enregistrer les modifications</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
