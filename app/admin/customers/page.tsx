import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MoreHorizontal } from "lucide-react"

export default function AdminCustomersPage() {
  const customers = [
    { name: "Jean Dupont", email: "jean.dupont@email.com", orders: 3, spent: "30 000 FCFA", joined: "Juin 2026" },
    { name: "Marie Curie", email: "marie.curie@email.com", orders: 1, spent: "5 000 FCFA", joined: "Juillet 2026" },
    { name: "Amadou Koné", email: "amadou.kone@email.com", orders: 2, spent: "27 000 FCFA", joined: "Mai 2026" },
    { name: "Fatima Diallo", email: "fatima.diallo@email.com", orders: 1, spent: "15 000 FCFA", joined: "Juillet 2026" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Clients</h1>
        <p className="text-muted-foreground">Liste des clients ayant effectué des achats sur YIsonBits.</p>
      </div>

      <Card className="border border-border/60 rounded-xl overflow-hidden">
        <CardContent className="p-0 bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/60 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Commandes</th>
                  <th className="px-6 py-4">Total dépensé</th>
                  <th className="px-6 py-4">Inscrit le</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {customers.map((customer) => (
                  <tr key={customer.email} className="hover:bg-muted/50 transition-colors text-sm">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <p className="font-bold">{customer.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{customer.email}</td>
                    <td className="px-6 py-4 font-medium tabular">{customer.orders}</td>
                    <td className="px-6 py-4 font-extrabold tabular">{customer.spent}</td>
                    <td className="px-6 py-4 text-muted-foreground">{customer.joined}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" aria-label={`Contacter ${customer.name}`}>
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" aria-label={`Options pour ${customer.name}`}>
                        <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
