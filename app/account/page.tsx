import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Download, Heart, Zap } from "lucide-react"

export default function AccountDashboard() {
  const stats = [
    { name: "Commandes", value: "3", icon: ShoppingBag, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { name: "Téléchargements", value: "8", icon: Download, color: "text-green-500 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
    { name: "Favoris", value: "12", icon: Heart, color: "text-red-500 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" },
    { name: "Crédits", value: "0", icon: Zap, color: "text-primary", bg: "bg-primary/10" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-none bg-white dark:bg-gray-950 overflow-hidden">
            <CardContent className="p-6">
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center mb-4", stat.bg, stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.name}</p>
              <p className="text-2xl font-extrabold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Activités Récentes</h2>
        <Card className="border-slate-100 dark:border-gray-800 overflow-hidden rounded-2xl">
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100 dark:divide-gray-800">
              {[
                { type: "Achat", item: "Afro Soul Vibe", date: "24 Juillet 2026", amount: "15 000 FCFA" },
                { type: "Téléchargement", item: "Highlife Essence", date: "22 Juillet 2026", amount: "Gratuit" },
                { type: "Achat", item: "Urban Trap MIDI", date: "15 Juillet 2026", amount: "3 000 FCFA" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-slate-500 dark:text-gray-400">
                      {activity.type === "Achat" ? <ShoppingBag className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{activity.item}</p>
                      <p className="text-xs text-muted-foreground">{activity.type} • {activity.date}</p>
                    </div>
                  </div>
                  <p className="text-sm font-extrabold">{activity.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


