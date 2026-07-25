"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Save, Store, CreditCard, Globe, Bell } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">Configurez les paramètres de votre boutique YIsonBits.</p>
      </div>

      <Card className="border-slate-100 rounded-2xl overflow-hidden">
        <CardContent className="p-8 space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Store className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg">Informations de la boutique</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-14">
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Nom de la boutique</label>
                <input type="text" className="h-11 w-full rounded-xl border bg-muted/30 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue="YIsonBits" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Email de contact</label>
                <input type="email" className="h-11 w-full rounded-xl border bg-muted/30 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue="contact@yisonbits.com" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Description courte</label>
                <textarea rows={3} className="w-full rounded-xl border bg-muted/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue="Boutique de beats, loops, samples et services musicaux par YIsonBits." />
              </div>
            </div>
          </div>

          <div className="border-t pt-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <CreditCard className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg">Paiement</h3>
            </div>
            <div className="space-y-4 ml-14">
              <div className="p-4 rounded-xl border bg-primary/5 border-primary/20">
                <p className="font-bold text-sm">Wave</p>
                <p className="text-xs text-muted-foreground mt-1">Numéro Wave : +226 00 00 00 00</p>
                <p className="text-xs text-muted-foreground">Statut : <span className="text-green-500 font-bold">Connecté</span></p>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 flex justify-end">
            <Button className="gap-2"><Save className="h-4 w-4" /> Enregistrer les paramètres</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
