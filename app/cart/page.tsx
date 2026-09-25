"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CartPage() {
  const { items, removeItem, totalPrice, totalCount } = useCart()

  if (totalCount === 0) {
    return (
      <div className="container py-24 flex flex-col items-center justify-center space-y-6">
        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground/30" aria-hidden="true" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold">Votre panier est vide</h1>
          <p className="text-muted-foreground">Il semble que vous n&apos;ayez pas encore ajouté de beats à votre panier.</p>
        </div>
        <Button size="lg" asChild>
          <Link href="/shop">Explorer la boutique</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-extrabold tracking-tight mb-12 text-balance">Mon panier ({totalCount})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-border/60 bg-card">
              <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden shrink-0 border border-border/60">
                <Image src={item.coverImage} alt={item.name} fill sizes="96px" className="object-cover" />
              </div>
              
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-base md:text-lg truncate">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.type} • {item.style}</p>
                  </div>
                  <p className="font-extrabold text-primary whitespace-nowrap tabular">{formatPrice(item.license?.price ?? item.price)}</p>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-xs font-medium text-muted-foreground">
                    <span>{item.format}</span>
                    {item.license ? (
                      <span className="text-primary font-semibold">{item.license.name}</span>
                    ) : (
                      <span>Licence commerciale</span>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/20"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Retirer ${item.name} du panier`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-xl border border-border  overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-xl font-bold">Récapitulatif</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-bold tabular">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">TVA (0%)</span>
                  <span className="font-bold tabular">0 FCFA</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-extrabold text-primary tabular">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button size="lg" className="w-full h-14 text-base font-bold" asChild>
                  <Link href="/checkout">
                    Passer au paiement <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-500 dark:text-green-400" aria-hidden="true" />
                  Paiement sécurisé : Wave, Orange Money, MTN MoMo, Carte
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-medium text-primary mb-2">Code promo ?</p>
            <form className="flex gap-2">
              <label htmlFor="promo-code" className="sr-only">Code promo</label>
              <input
                id="promo-code"
                type="text"
                name="code"
                autoComplete="off"
                placeholder="Entrez votre code"
                className="flex-1 bg-card border border-border rounded-lg px-4 py-2 text-sm transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
              <Button size="sm" className="rounded-lg">Appliquer</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}