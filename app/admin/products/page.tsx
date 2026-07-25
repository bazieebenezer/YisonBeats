import { products } from "@/data/products"
import Image from "next/image"
import { MoreHorizontal, Plus, Search, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"

export default function AdminProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Produits</h1>
          <p className="text-muted-foreground">Gérez votre catalogue de beats et de packs.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Ajouter un produit
        </Button>
      </div>

      <Card className="border-none rounded-2xl overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between bg-white">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Filtrer les produits..." 
              className="h-9 w-full rounded-lg border bg-slate-50 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Exporter CSV</Button>
            <Button variant="outline" size="sm">Filtres</Button>
          </div>
        </div>
        
        <CardContent className="p-0 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <th className="px-6 py-4">Produit</th>
                  <th className="px-6 py-4">Type / Style</th>
                  <th className="px-6 py-4">Prix</th>
                  <th className="px-6 py-4">Ventes</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors text-sm group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 border">
                          <Image src={product.coverImage} alt={product.name} fill className="object-cover" />
                        </div>
                        <p className="font-bold truncate max-w-[200px]">{product.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{product.type}</p>
                      <p className="text-[10px] text-muted-foreground">{product.style}</p>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-primary">
                      {product.isFree ? "Gratuit" : formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      24 ventes
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                        Actif
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
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
