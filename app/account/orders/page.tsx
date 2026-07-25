import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, ChevronRight, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OrdersPage() {
  const orders = [
    { id: "CMD-2026-001", date: "24 Juillet 2026", items: 2, total: "30 000 FCFA", status: "Payée", products: ["Afro Soul Vibe", "Makossa Power"] },
    { id: "CMD-2026-002", date: "15 Juillet 2026", items: 1, total: "3 000 FCFA", status: "Payée", products: ["Urban Trap MIDI"] },
    { id: "CMD-2026-003", date: "10 Juillet 2026", items: 1, total: "10 000 FCFA", status: "Payée", products: ["Smooth Jazz Piano"] },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight">Mes commandes</h2>
        <p className="text-muted-foreground">Retrouvez l&apos;historique de toutes vos commandes.</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="border-slate-100 overflow-hidden rounded-2xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-primary">{order.id}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      order.status === "Payée" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.date} &bull; {order.items} produit(s)</p>
                </div>
                <p className="font-extrabold text-lg">{order.total}</p>
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div className="flex gap-2">
                  {order.products.map((p) => (
                    <span key={p} className="text-xs bg-slate-50 px-2 py-1 rounded-md font-medium">{p}</span>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-xs font-bold" asChild>
                  <Link href={`/account/downloads`}>
                    Voir les détails <ChevronRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed border-2 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center">
          <ShoppingBag className="h-8 w-8 text-muted-foreground/30" />
        </div>
        <p className="text-sm text-muted-foreground max-w-md">
          Vous pouvez télécharger vos produits achetés depuis la page &quot;Mes téléchargements&quot;.
        </p>
        <Button size="sm" variant="outline" asChild>
          <Link href="/account/downloads"><Download className="mr-2 h-4 w-4" /> Voir mes téléchargements</Link>
        </Button>
      </Card>
    </div>
  )
}
