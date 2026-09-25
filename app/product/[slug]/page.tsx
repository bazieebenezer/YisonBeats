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
  ChevronLeft,
  Crown
} from "lucide-react"
import { products } from "@/data/products"
import { formatPrice } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product/ProductCard"
import { Waveform } from "@/components/ui/waveform"
import { useAudio } from "@/hooks/use-audio"
import { useCart } from "@/hooks/use-cart"
import {
  licenseOptions,
  supportsLicenses,
  getLicensePrice,
  type LicenseId,
} from "@/data/licenses"

function fmt(t: number) {
  if (isNaN(t) || !isFinite(t)) return "0:00"
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60).toString().padStart(2, "0")
  return `${m}:${s}`
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug)
  const { currentTrack, isPlaying, playTrack, seek, progress, duration } = useAudio()
  const { addItem, items } = useCart()
  const router = useRouter()
  const [licenseId, setLicenseId] = React.useState<LicenseId>("mp3-lease")

  if (!product) {
    notFound()
  }

  const similarProducts = products
    .filter((p) => p.type === product.type && p.id !== product.id)
    .slice(0, 4)

  const isLeaseProduct = supportsLicenses(product)
  const selectedLicense = licenseOptions.find((l) => l.id === licenseId) ?? licenseOptions[0]
  const displayPrice = isLeaseProduct
    ? getLicensePrice(product.price, selectedLicense.priceMultiplier)
    : product.price

  const isCurrentTrack = currentTrack?.id === product.id
  const isPreviewActive = isCurrentTrack && isPlaying
  const previewRatio = isCurrentTrack && duration > 0 ? Math.min(progress / duration, 1) : 0

  const isInCart = items.some((item) => item.id === product.id)
  const inCartSameLicense = isInCart && (!isLeaseProduct || items.some((item) => item.id === product.id && item.license?.id === licenseId))

  const handlePreviewPlay = () => {
    playTrack(product)
  }

  const handlePreviewSeek = (ratio: number) => {
    if (!isCurrentTrack) {
      playTrack(product)
      return
    }
    seek(ratio * duration)
  }

  const handleAddToCart = () => {
    addItem(
      product,
      isLeaseProduct
        ? { id: selectedLicense.id, name: selectedLicense.name, price: displayPrice }
        : undefined
    )
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/cart")
  }

  return (
    <div className="pb-20">
      <div className="container py-8">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Retour à la boutique
        </Link>
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border">
            <Image 
              src={product.coverImage} 
              alt={product.name} 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-block rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-foreground">
                  {product.type}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display leading-tight">
                  {product.name}
                </h1>
              </div>
              <Button
                size="icon"
                className="h-11 w-11 p-2 rounded-full bg-background text-foreground hover:bg-background/90$"
                onClick={handlePreviewPlay}
                aria-label={isPreviewActive ? `Mettre en pause ${product.name}` : `Écouter ${product.name}`}
              >
                {isPreviewActive ? (
                  <Pause className="h-8 w-8 fill-current" aria-hidden="true" />
                ) : (
                  <Play className="h-8 w-8 fill-current ml-1" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>

          {/* Waveform preview */}
          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Prévisualisation</p>
                  {product.duration && (
                    <span className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" aria-hidden="true" /> {product.duration}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground tabular">{fmt(progress)} / {fmt(duration)}</span>
              </div>

              <div className="h-16 w-full rounded-lg border border-border bg-background px-3 py-2.5">
                <Waveform
                  seed={product.id}
                  progress={previewRatio}
                  isPlaying={isPreviewActive}
                  interactive
                  onSeek={handlePreviewSeek}
                  activeClass="bg-primary"
                  inactiveClass="bg-foreground/15"
                  label="Position de lecture"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={handlePreviewPlay} className="gap-2">
                  {isPreviewActive ? (
                    <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
                  ) : (
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                  )}
                  {isPreviewActive ? "Mettre en pause" : "Écouter l'aperçu"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  {product.bpm && <span className="tabular">{product.bpm} BPM</span>}
                  {product.bpm && product.key && <span className="mx-2">•</span>}
                  {product.key}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b pb-6">
              <button className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                <Heart className="h-5 w-5" aria-hidden="true" /> Ajouter aux favoris
              </button>
              <button className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                <Share2 className="h-5 w-5" aria-hidden="true" /> Partager
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">À propos de ce produit</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-lg border border-border bg-background">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">BPM</p>
                <p className="text-xl font-bold tabular">{product.bpm || "N/A"}</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-background">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Tonalité</p>
                <p className="text-xl font-bold">{product.key || "N/A"}</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-background">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Format</p>
                <p className="text-xl font-bold">{product.format}</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-background">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Taille</p>
                <p className="text-xl font-bold">{product.size}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="sticky top-28 overflow-hidden rounded-xl border border-border">
            <CardContent className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Prix</p>
                  <p className="text-4xl font-extrabold text-primary">
                    {product.isFree ? "Gratuit" : formatPrice(displayPrice)}
                  </p>
                </div>
                {product.isFree && (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300">
                    <Download className="h-6 w-6" aria-hidden="true" />
                  </div>
                )}
                {isLeaseProduct && (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Music className="h-6 w-6" aria-hidden="true" />
                  </div>
                )}
              </div>

              {isLeaseProduct && !product.isFree ? (
                <div className="space-y-4">
                  <p className="text-sm font-bold uppercase tracking-widest">Choisissez votre licence</p>
                  <div className="space-y-3">
                    {licenseOptions.map((lic) => {
                      const isSelected = licenseId === lic.id
                      return (
                        <button
                          key={lic.id}
                          type="button"
                          onClick={() => setLicenseId(lic.id)}
                          aria-pressed={isSelected}
                          className={cn(
                            "w-full p-4 rounded-lg border text-left transition-colors",
                            isSelected
                              ? "border-primary bg-accent"
                              : "border-border bg-background hover:border-foreground/30"
                          )}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <p className="font-bold">{lic.name}</p>
                              {lic.premium && (
                                <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                                  <Crown className="h-3 w-3" aria-hidden="true" /> Populaire
                                </span>
                              )}
                            </div>
                            <span className="font-extrabold text-primary tabular whitespace-nowrap">
                              {formatPrice(getLicensePrice(product.price, lic.priceMultiplier))}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1.5">{lic.tagline}</p>
                        </button>
                      )
                    })}
                  </div>

                  <ul className="space-y-2 pt-2">
                    {selectedLicense.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" aria-hidden="true" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-bold uppercase tracking-widest">Licence incluse</p>
                  <div className="p-4 rounded-lg border border-border bg-background flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-sm">{product.licence || "Standard License"}</p>
                      <p className="text-xs text-muted-foreground mt-1">Utilisation commerciale, monétisation autorisée.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm font-bold uppercase tracking-widest">Avantages</p>
                <ul className="space-y-2">
                  {[
                    "Qualité studio (WAV 24-bit)",
                    "Libre de droits selon la licence choisie",
                    "Téléchargement instantané",
                    "Support technique 24/7"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4 text-primary" aria-hidden="true" /> {item}
                    </li>
                  ))}
                </ul>
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
                      onClick={handleAddToCart}
                      disabled={inCartSameLicense}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
                      {isInCart
                        ? inCartSameLicense
                          ? "Déjà dans le panier"
                          : "Mettre à jour la licence"
                        : "Ajouter au panier"}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full h-14 text-base font-bold"
                      onClick={handleBuyNow}
                      disabled={inCartSameLicense}
                    >
                      Acheter maintenant
                    </Button>
                  </>
                )}
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Paiement sécurisé : Wave, Orange Money, MTN MoMo, Carte bancaire. Pas de frais cachés.
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