import { services } from "@/data/services"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit2, Trash2, MoreHorizontal } from "lucide-react"
import * as Icons from "lucide-react"

export default function AdminServicesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Gérez vos services musicaux proposés aux clients.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Ajouter un service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = (Icons as any)[service.icon.charAt(0).toUpperCase() + service.icon.slice(1)] || Icons.Music
          return (
            <Card key={service.id} className="border-slate-100 dark:border-gray-800 rounded-2xl overflow-hidden group">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">{service.name}</h3>
                      <p className="text-xs text-muted-foreground">{service.priceInfo}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 dark:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
