"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, Pause, ShoppingCart, Download, Eye } from "lucide-react"
import { Product } from "@/data/products"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/hooks/use-audio"
import { useCart } from "@/hooks/use-cart"

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
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <Image
          src={product.coverImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <span className="rounded-full bg-navy/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ">
            {product.type}
          </span>
          {product.isFree ? (
            <span className="w-fit rounded-full bg-green-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ">
              Gratuit
            </span>
          ) : (
            <span className="w-fit rounded-full bg-primary/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-navy/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="h-12 w-12 rounded-full"
            onClick={() => playTrack(product)}
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="h-8 w-8 fill-current" />
            ) : (
              <Play className="h-8 w-8 fill-current ml-0.5" />
            )}
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between">
          <Link href={`/product/${product.slug}`} className="hover:text-primary transition-colors">
            <h3 className="font-display text-lg font-bold leading-tight">{product.name}</h3>
          </Link>
          <span className="text-xs text-muted-foreground">{product.style}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
            {product.bpm && <span>{product.bpm} BPM</span>}
            {product.key && <span>{product.key}</span>}
          </div>
          
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" asChild>
              <Link href={`/product/${product.slug}`}>
                <Eye className="h-5 w-5" />
              </Link>
            </Button>

            {product.isFree ? (
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                asChild
              >
                <a href={product.downloadUrl} download>
                  <Download className="h-5 w-5" />
                </a>
              </Button>
            ) : (
              <Button
                variant={isInCart ? "default" : "outline"}
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => addItem(product)}
                disabled={isInCart}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}