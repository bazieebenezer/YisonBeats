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
      <div className="container py-20 flex flex-col items-center justify-center space-y-6">
        <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold">Votre panier est vide</h1>
          <p className="text-muted-foreground">Il semble que vous n'ayez pas encore ajouté de beats à votre panier.</p>
        </div>
        <Button size="lg" asChild>
          <Link href="/shop">Explorer la boutique</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-extrabold tracking-tight mb-12">Mon panier ({totalCount})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-6 p-4 rounded-2xl border bg-white">
              <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0 border">
                <Image src={item.coverImage} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg truncate">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.type} • {item.style}</p>
                  </div>
                  <p className="font-extrabold text-primary">{formatPrice(item.price)}</p>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-4 text-xs font-medium text-muted-foreground">
                    <span>{item.format}</span>
                    <span>Licence commerciale</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-red-500 hover:bg-red-50"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-[2rem] border-2 border-slate-100 overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-xl font-bold">Récapitulatif</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">TVA (0%)</span>
                  <span className="font-bold">0 FCFA</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-extrabold text-primary">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button size="lg" className="w-full h-14 text-base font-bold" asChild>
                  <Link href="/checkout">
                    Passer au paiement <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  Paiement 100% sécurisé via Wave
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <p className="text-sm font-medium text-primary mb-2">Code promo ?</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Entrez votre code" 
                className="flex-1 bg-white border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button size="sm">Appliquer</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
