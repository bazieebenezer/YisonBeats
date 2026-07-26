import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, DollarSign, ShoppingBag, Download, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { name: "Chiffre d'affaires", value: "245 000 FCFA", change: "+12%", icon: DollarSign, color: "text-green-500 dark:text-green-400" },
    { name: "Commandes", value: "18", change: "+5%", icon: ShoppingBag, color: "text-blue-500 dark:text-blue-400" },
    { name: "Téléchargements", value: "142", change: "+24%", icon: Download, color: "text-purple-500 dark:text-purple-400" },
    { name: "Taux de conversion", value: "3.2%", change: "+0.8%", icon: TrendingUp, color: "text-primary" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">Voici l'état actuel de votre boutique YIsonBits.</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Période</p>
          <p className="font-bold">30 derniers jours</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-none bg-white dark:bg-gray-950 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-gray-900", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                  {stat.change} <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.name}</p>
              <p className="text-2xl font-extrabold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none rounded-2xl overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between bg-white dark:bg-gray-950">
            <h3 className="font-bold">Commandes récentes</h3>
            <button className="text-xs font-bold text-primary hover:underline">Voir tout</button>
          </div>
          <CardContent className="p-0 bg-white dark:bg-gray-950">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-gray-900 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <th className="px-6 py-4">Commande</th>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Produits</th>
                    <th className="px-6 py-4">Montant</th>
                    <th className="px-6 py-4">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                  {[
                    { id: "#1234", customer: "Jean Dupont", items: "2 produits", amount: "30 000 FCFA", status: "Payé" },
                    { id: "#1233", customer: "Marie Curie", items: "1 produit", amount: "5 000 FCFA", status: "Payé" },
                    { id: "#1232", customer: "Amadou Koné", items: "1 produit", amount: "15 000 FCFA", status: "En attente" },
                  ].map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors text-sm">
                      <td className="px-6 py-4 font-bold text-primary">{order.id}</td>
                      <td className="px-6 py-4 font-medium">{order.customer}</td>
                      <td className="px-6 py-4 text-muted-foreground">{order.items}</td>
                      <td className="px-6 py-4 font-extrabold">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                          order.status === "Payé" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300" : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300"
                        )}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none rounded-2xl overflow-hidden bg-white dark:bg-gray-950">
          <div className="p-6 border-b">
            <h3 className="font-bold">Produits populaires</h3>
          </div>
          <CardContent className="p-6 space-y-6">
            {[
              { name: "Afro Soul Vibe", sales: 45, revenue: "675k FCFA" },
              { name: "Makossa Power", sales: 32, revenue: "160k FCFA" },
              { name: "Sébène Pack", sales: 28, revenue: "700k FCFA" },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-gray-400">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">{p.sales} ventes</p>
                  </div>
                </div>
                <p className="text-sm font-extrabold">{p.revenue}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


