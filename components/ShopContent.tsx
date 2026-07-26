"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react"
import { products, Product } from "@/data/products"
import { categories, styles } from "@/data/constants"
import { ProductCard } from "@/components/product/ProductCard"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ShopContent() {
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get("q") || ""
  const urlType = searchParams.get("type") || ""
  const [searchQuery, setSearchQuery] = React.useState(urlQuery)
  const [selectedType, setSelectedType] = React.useState<string | null>(urlType || null)
  const [selectedStyle, setSelectedStyle] = React.useState<string | null>(null)
  const [priceFilter, setPriceFilter] = React.useState<"all" | "free" | "paid">("all")
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.style.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedType || product.type === selectedType
    const matchesStyle = !selectedStyle || product.style === selectedStyle
    const matchesPrice = priceFilter === "all" || 
                        (priceFilter === "free" && product.isFree) || 
                        (priceFilter === "paid" && !product.isFree)
    
    return matchesSearch && matchesType && matchesStyle && matchesPrice
  })

  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">La boutique</h1>
        <p className="text-muted-foreground">Parcourez notre catalogue complet de créations musicales.</p>
      </div>

      {/* Search and Quick Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un beat, un style..."
            className="h-11 w-full rounded-xl border bg-muted/30 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <Button 
            variant={priceFilter === "all" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setPriceFilter("all")}
            className="rounded-full"
          >
            Tous
          </Button>
          <Button 
            variant={priceFilter === "free" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setPriceFilter("free")}
            className="rounded-full"
          >
            Gratuits
          </Button>
          <Button 
            variant={priceFilter === "paid" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setPriceFilter("paid")}
            className="rounded-full"
          >
            Payants
          </Button>
          <div className="w-px h-6 bg-border mx-2 hidden md:block" />
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtres
            {(selectedType || selectedStyle) && (
              <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                {(selectedType ? 1 : 0) + (selectedStyle ? 1 : 0)}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Expanded Filters */}
      {isFilterOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 bg-muted/30 rounded-2xl border animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Type de produit</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedType(selectedType === cat.name ? null : cat.name)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                    selectedType === cat.name 
                      ? "bg-primary border-primary text-white" 
                      : "bg-white dark:bg-gray-900 border-border hover:border-primary/50"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Styles</h3>
            <div className="flex flex-wrap gap-2">
              {styles.slice(0, 12).map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(selectedStyle === style ? null : style)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                    selectedStyle === style 
                      ? "bg-primary border-primary text-white" 
                      : "bg-white dark:bg-gray-900 border-border hover:border-primary/50"
                  )}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex items-end justify-end gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSelectedType(null)
                setSelectedStyle(null)
                setPriceFilter("all")
              }}
            >
              Réinitialiser tout
            </Button>
            <Button size="sm" onClick={() => setIsFilterOpen(false)}>
              Appliquer les filtres
            </Button>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b pb-4">
          <p className="text-sm text-muted-foreground">
            Affichage de <span className="font-bold text-foreground">{filteredProducts.length}</span> produits
          </p>
          <div className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:text-primary">
            Trier par: <span className="text-primary font-bold">Nouveautés</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <p className="text-xl font-bold">Aucun produit trouvé</p>
            <p className="text-muted-foreground">Essayez de modifier vos filtres ou votre recherche.</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("")
              setSelectedType(null)
              setSelectedStyle(null)
              setPriceFilter("all")
            }}>
              Effacer tout
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
