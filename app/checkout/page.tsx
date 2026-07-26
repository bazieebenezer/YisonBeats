"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { 
  CreditCard, 
  Wallet, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronLeft,
  Loader2,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [step, setStep] = React.useState<"info" | "payment" | "success">("info")
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    if (items.length === 0 && step !== "success") {
      router.push("/cart")
    }
  }, [items.length, step, router])

  if (!mounted) return null

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setStep("success")
      clearCart()
    }, 3000)
  }

  if (step === "success") {
    return (
      <div className="container py-20 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-300">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <div className="space-y-4 max-w-lg">
          <h1 className="text-4xl font-extrabold tracking-tight">Merci pour votre achat !</h1>
          <p className="text-lg text-muted-foreground">
            Votre commande a été validée avec succès. Vous pouvez maintenant télécharger vos produits depuis votre espace client.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="h-14 px-8 font-bold" asChild>
            <Link href="/account/downloads">Accéder à mes téléchargements</Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 font-bold" asChild>
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12 max-w-4xl space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Paiement</h1>
        <div className="flex items-center gap-4">
          <div className={cn("flex items-center gap-2", step === "info" ? "text-primary" : "text-muted-foreground")}>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs font-bold">1</span>
            <span className="text-sm font-bold">Informations</span>
          </div>
          <div className="h-px w-8 bg-border" />
          <div className={cn("flex items-center gap-2", step === "payment" ? "text-primary" : "text-muted-foreground")}>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs font-bold">2</span>
            <span className="text-sm font-bold">Paiement</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          {step === "info" ? (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Vos coordonnées</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Prénom</label>
                  <input type="text" className="h-11 w-full rounded-xl border bg-slate-50 dark:bg-gray-900 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Jean" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Nom</label>
                  <input type="text" className="h-11 w-full rounded-xl border bg-slate-50 dark:bg-gray-900 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Dupont" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Email</label>
                <input type="email" className="h-11 w-full rounded-xl border bg-slate-50 dark:bg-gray-900 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="jean.dupont@email.com" />
                <p className="text-xs text-muted-foreground">Vos fichiers seront envoyés à cette adresse.</p>
              </div>
              <Button size="lg" className="w-full h-14 font-bold" onClick={() => setStep("payment")}>
                Continuer vers le paiement
              </Button>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setStep("info")}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-bold">Mode de paiement</h2>
                
                <div className="space-y-4">
                  <div className="relative p-6 rounded-2xl border-2 border-primary bg-primary/5 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white">
                        <Wallet className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold">Wave</p>
                        <p className="text-sm text-muted-foreground">Paiement mobile instantané</p>
                      </div>
                    </div>
                    <div className="h-6 w-6 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                    </div>
                  </div>

                  <div className="relative p-6 rounded-2xl border bg-slate-50 dark:bg-gray-900 flex items-center justify-between cursor-not-allowed opacity-50">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-gray-700 flex items-center justify-center text-slate-500 dark:text-gray-400">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold">Carte Bancaire</p>
                        <p className="text-sm text-muted-foreground">Bientôt disponible</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                  En cliquant sur "Confirmer le paiement", vous serez redirigé vers l'interface sécurisée de Wave pour finaliser la transaction.
                </p>
              </div>

              <Button 
                size="lg" 
                className="w-full h-14 font-bold" 
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  `Payer ${formatPrice(totalPrice)} via Wave`
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <Card className="rounded-[2rem] border-2 border-slate-100 dark:border-gray-800 overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-xl font-bold">Votre commande</h2>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 border">
                      <Image src={item.coverImage} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.type}</p>
                    </div>
                    <p className="text-sm font-bold">{formatPrice(item.price)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-extrabold text-primary">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-green-500 dark:text-green-400" />
                Paiement crypté & sécurisé
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


