"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, Pause, ShoppingCart, Download, Eye, Check } from "lucide-react"
import { Product } from "@/data/products"
import { formatPrice } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/hooks/use-audio"
import { useCart } from "@/hooks/use-cart"
import { getDefaultLicense } from "@/data/licenses"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { currentTrack, isPlaying, playTrack } = useAudio()
  const { addItem, items } = useCart()
  const isInCart = items.some((item) => item.id === product.id)
  const isCurrentTrack = currentTrack?.id === product.id

  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted border border-border">
        <Image
          src={product.coverImage}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          <span className="rounded-md border border-border bg-background/90 px-2 py-0.5 text-[11px] font-medium text-foreground backdrop-blur-sm">
            {product.type}
          </span>
          {product.isFree ? (
            <span className="rounded-md border border-green-500/40 bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700 dark:bg-green-950/60 dark:text-green-300">
              Gratuit
            </span>
          ) : (
            <span className="rounded-md bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <div className="absolute inset-x-3 bottom-3 flex justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100">
<button
            onClick={() => playTrack(product)}
            aria-label={isCurrentTrack && isPlaying ? `Mettre en pause ${product.name}` : `Écouter ${product.name}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="h-5 w-5 fill-current" aria-hidden="true" />
            ) : (
              <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between">
          <Link href={`/product/${product.slug}`} className="hover:text-foreground transition-colors">
            <h3 className="font-display text-base font-semibold leading-tight">{product.name}</h3>
          </Link>
          <span className="text-xs text-muted-foreground">{product.style}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-medium tabular">
            {product.bpm && <span>{product.bpm} BPM</span>}
            {product.key && <span>{product.key}</span>}
          </div>
          
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" asChild>
              <Link href={`/product/${product.slug}`} aria-label={`Voir ${product.name}`}>
                <Eye className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>

            {product.isFree ? (
              <Button
                variant="outline"
                size="icon"
                className={cn("h-9 w-9 rounded-lg border-green-500/50 text-green-600 hover:border-green-500 hover:bg-green-500 hover:text-white dark:text-green-400")}
                asChild
              >
                <a href={product.downloadUrl} download aria-label={`Télécharger ${product.name}`}>
                  <Download className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            ) : (
              <Button
                variant={isInCart ? "secondary" : "outline"}
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-lg",
                  isInCart &&
                    "border-foreground bg-foreground text-background hover:bg-foreground/90 disabled:opacity-100"
                )}
                onClick={() => addItem(product, getDefaultLicense(product))}
                disabled={isInCart}
                aria-label={isInCart ? `${product.name} déjà dans le panier` : `Ajouter ${product.name} au panier`}
              >
                {isInCart ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}