"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { 
  Play, 
  Pause, 
  ShoppingCart, 
  Download, 
  Share2, 
  Heart,
  Clock,
  Music,
  Zap,
  CheckCircle2,
  ChevronLeft
} from "lucide-react"
import { products } from "@/data/products"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product/ProductCard"
import { useAudio } from "@/hooks/use-audio"
import { useCart } from "@/hooks/use-cart"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug)
  const { currentTrack, isPlaying, playTrack } = useAudio()
  const { addItem, items } = useCart()
  const router = useRouter()

  if (!product) {
    notFound()
  }

  const similarProducts = products
    .filter((p) => p.type === product.type && p.id !== product.id)
    .slice(0, 4)

  const isCurrentTrack = currentTrack?.id === product.id
  const isInCart = items.some((item) => item.id === product.id)

  return (
    <div className="pb-20">
      <div className="container py-8">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Retour à la boutique
        </Link>
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden border">
            <Image 
              src={product.coverImage} 
              alt={product.name} 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div className="space-y-2">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  {product.type}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display leading-tight">
                  {product.name}
                </h1>
              </div>
              <Button
                size="icon"
                className="h-8 w-8 rounded-full bg-white text-primary hover:bg-white/90 "
                onClick={() => playTrack(product)}
              >
                {isCurrentTrack && isPlaying ? (
                  <Pause className="h-8 w-8 fill-current" />
                ) : (
                  <Play className="h-8 w-8 fill-current ml-1" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b pb-6">
              <button className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                <Heart className="h-5 w-5" /> Ajouter aux favoris
              </button>
              <button className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                <Share2 className="h-5 w-5" /> Partager
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">À propos de ce produit</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">BPM</p>
                <p className="text-xl font-bold">{product.bpm || "N/A"}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Tonalité</p>
                <p className="text-xl font-bold">{product.key || "N/A"}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Format</p>
                <p className="text-xl font-bold">{product.format}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Taille</p>
                <p className="text-xl font-bold">{product.size}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="sticky top-28 overflow-hidden rounded-[2rem] border-2 border-primary/10">
            <CardContent className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Prix</p>
                  <p className="text-4xl font-extrabold text-primary">
                    {product.isFree ? "Gratuit" : formatPrice(product.price)}
                  </p>
                </div>
                {product.isFree && (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Download className="h-6 w-6" />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-bold uppercase tracking-widest">Licence incluse</p>
                  <div className="p-4 rounded-xl bg-slate-50 border flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm">{product.licence || "Standard License"}</p>
                      <p className="text-xs text-muted-foreground mt-1">Utilisation commerciale, monétisation autorisée.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold uppercase tracking-widest">Avantages</p>
                  <ul className="space-y-2">
                    {[
                      "Qualité studio (WAV 24-bit)",
                      "Libre de droits après achat",
                      "Téléchargement instantané",
                      "Support technique 24/7"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-4 w-4 text-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                {product.isFree ? (
                  <Button
                    size="lg"
                    className="w-full h-14 text-base font-bold bg-green-500 hover:bg-green-600"
                    asChild
                  >
                    <a href={product.downloadUrl} download>Télécharger gratuitement</a>
                  </Button>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="w-full h-14 text-base font-bold"
                      onClick={() => addItem(product)}
                      disabled={isInCart}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {isInCart ? "Déjà dans le panier" : "Ajouter au panier"}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full h-14 text-base font-bold"
                      onClick={() => { addItem(product); router.push("/cart") }}
                      disabled={isInCart}
                    >
                      Acheter maintenant
                    </Button>
                  </>
                )}
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Paiement sécurisé via Wave. Pas de frais cachés.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <section className="container mt-32 space-y-12">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Vous aimerez aussi</p>
              <h2 className="text-3xl font-extrabold tracking-tight">Produits Similaires</h2>
            </div>
            <Button variant="ghost" className="font-bold" asChild>
              <Link href="/shop">Voir tout</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
