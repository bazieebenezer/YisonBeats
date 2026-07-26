import { products } from "@/data/products"
import Image from "next/image"
import { Download, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DownloadsPage() {
  // Simulating purchased items
  const purchasedItems = products.slice(0, 3)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight">Mes téléchargements</h2>
        <p className="text-muted-foreground">Retrouvez ici tous les produits que vous avez achetés ou téléchargés gratuitement.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {purchasedItems.map((item) => (
          <div key={item.id} className="flex items-center gap-6 p-4 rounded-2xl border bg-white dark:bg-gray-950 transition-all group">
            <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0 border">
              <Image src={item.coverImage} alt={item.name} fill className="object-cover" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold truncate">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">Acheté le 24 Juillet 2026 • {item.format}</p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <Button variant="secondary" size="sm" className="h-8 text-xs font-bold rounded-lg">
                  <Play className="mr-2 h-3 w-3 fill-current" /> Écouter
                </Button>
                <Button size="sm" className="h-8 text-xs font-bold rounded-lg bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                  <Download className="mr-2 h-3 w-3" /> Télécharger ({item.size})
                </Button>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {item.licence || "Commercial"}
              </span>
              <p className="text-xs text-muted-foreground mt-1">ID: #{item.id}12345</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
