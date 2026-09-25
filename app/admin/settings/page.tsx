"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Save, Store, CreditCard, Globe, Bell, Wallet, Smartphone } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">Configurez les paramètres de votre boutique YIsonBits.</p>
      </div>

      <Card className="border-border/60  rounded-xl overflow-hidden">
        <CardContent className="p-8 space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Store className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-lg">Informations de la boutique</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-14">
              <div className="space-y-2">
                <label htmlFor="nom-boutique" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Nom de la boutique</label>
                <input id="nom-boutique" type="text" className="h-11 w-full rounded-lg border border-border bg-muted/50 px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20" defaultValue="YIsonBits" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email-contact" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Email de contact</label>
                <input id="email-contact" type="email" className="h-11 w-full rounded-lg border border-border bg-muted/50 px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20" defaultValue="contact@yisonbits.com" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="description-courte" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Description courte</label>
                <textarea id="description-courte" rows={3} className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20" defaultValue="Boutique de beats, loops, samples et services musicaux par YIsonBits." />
              </div>
            </div>
          </div>

          <div className="border-t pt-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <CreditCard className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-lg">Paiement</h3>
            </div>
            <div className="space-y-4 ml-14">
              {[
                { Icon: Wallet, name: "Wave", info: "Numéro Wave : +226 00 00 00 00", color: "bg-blue-600" },
                { Icon: Smartphone, name: "Orange Money", info: "Numéro Orange Money : +226 00 00 00 00", color: "bg-orange-500" },
                { Icon: Smartphone, name: "MTN MoMo", info: "Numéro MTN MoMo : +226 00 00 00 00", color: "bg-yellow-400 text-black" },
                { Icon: CreditCard, name: "Carte bancaire", info: "CinetPay / Paystack (Visa, Mastercard)", color: "bg-violet-600" },
              ].map((m) => (
                <div key={m.name} className="p-4 rounded-xl border bg-primary/5 border-primary/20 flex items-start gap-3">
                  <div className={`h-9 w-9 rounded-xl ${m.color} flex items-center justify-center text-white shrink-0`}>
                    <m.Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{m.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.info}</p>
                    <p className="text-xs text-muted-foreground">Statut : <span className="text-green-700 dark:text-green-400 font-bold">Connecté</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-8 flex justify-end">
            <Button className="gap-2 rounded-lg"><Save className="h-4 w-4" aria-hidden="true" /> Enregistrer les paramètres</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
