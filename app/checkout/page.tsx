"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  CreditCard,
  Wallet,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  AlertCircle,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type PaymentMethodId = "wave" | "orange" | "mtn" | "card"

const paymentMethods: {
  id: PaymentMethodId
  name: string
  tagline: string
  icon: LucideIcon
  color: string
  needsPhone: boolean
  phoneLabel: string
  phonePlaceholder: string
}[] = [
  {
    id: "wave",
    name: "Wave",
    tagline: "Mobile money instantané",
    icon: Wallet,
    color: "bg-blue-600",
    needsPhone: true,
    phoneLabel: "Numéro Wave",
    phonePlaceholder: "07 00 00 00 00",
  },
  {
    id: "orange",
    name: "Orange Money",
    tagline: "Mobile money Orange",
    icon: Smartphone,
    color: "bg-orange-500",
    needsPhone: true,
    phoneLabel: "Numéro Orange Money",
    phonePlaceholder: "07 00 00 00 00",
  },
  {
    id: "mtn",
    name: "MTN MoMo",
    tagline: "Mobile money MTN",
    icon: Smartphone,
    color: "bg-yellow-400 text-black",
    needsPhone: true,
    phoneLabel: "Numéro MTN MoMo",
    phonePlaceholder: "05 00 00 00 00",
  },
  {
    id: "card",
    name: "Carte bancaire",
    tagline: "CinetPay / Paystack (Visa, Mastercard)",
    icon: CreditCard,
    color: "bg-violet-600",
    needsPhone: false,
    phoneLabel: "",
    phonePlaceholder: "",
  },
]

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [step, setStep] = React.useState<"info" | "payment" | "success">("info")
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [method, setMethod] = React.useState<PaymentMethodId>("wave")
  const [phone, setPhone] = React.useState("")

  React.useEffect(() => {
    setMounted(true)
    if (items.length === 0 && step !== "success") {
      router.push("/cart")
    }
  }, [items.length, step, router])

  if (!mounted) return null

  const activeMethod = paymentMethods.find((m) => m.id === method) ?? paymentMethods[0]
  const phoneValid = !activeMethod.needsPhone || phone.replace(/\D/g, "").length >= 8

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
        <div className="h-24 w-24 rounded-full bg-green-700 text-white dark:bg-green-700 flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12" aria-hidden="true" />
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
          <Button size="lg" variant="outline" className="h-14 px-8 font-bold rounded-lg" asChild>
            <Link href="/">Retour à l&apos;accueil</Link>
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
                  <label htmlFor="prenom" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Prénom</label>
                  <input id="prenom" name="prenom" type="text" autoComplete="given-name" className="h-11 w-full rounded-lg border border-border bg-card px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20" placeholder="Jean" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="nom" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Nom</label>
                  <input id="nom" name="nom" type="text" autoComplete="family-name" className="h-11 w-full rounded-lg border border-border bg-card px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20" placeholder="Dupont" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" className="h-11 w-full rounded-lg border border-border bg-card px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20" placeholder="jean.dupont@email.com" />
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paymentMethods.map((m) => {
                    const Icon = m.icon
                    const isSelected = method === m.id
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMethod(m.id)}
                        aria-pressed={isSelected}
                        className={cn(
                          "relative p-5 rounded-xl border-2 flex items-center gap-4 text-left transition-all",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-transparent bg-muted/50 hover:border-border/80"
                        )}
                      >
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center text-white shrink-0", m.color)}>
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold">{m.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{m.tagline}</p>
                        </div>
                        <span
                          className={cn(
                            "ml-auto h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center",
                            isSelected ? "border-primary" : "border-border/60"
                          )}
                          aria-hidden="true"
                        >
                          {isSelected && <span className="h-2.5 w-2.5 rounded-lg bg-primary" />}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {activeMethod.needsPhone && (
                  <div className="space-y-2">
                    <label htmlFor="payment-phone" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                      {activeMethod.phoneLabel}
                    </label>
                    <input
                      id="payment-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={activeMethod.phonePlaceholder}
                      className="h-11 w-full rounded-lg border border-border bg-card px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      Une demande de paiement sera envoyée à ce numéro via {activeMethod.name}.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 rounded-xl bg-muted/40 border border-border flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-foreground mt-0.5 shrink-0" aria-hidden="true" />
                <p className="text-sm text-foreground leading-relaxed">
                  {activeMethod.needsPhone
                    ? `En cliquant sur "Confirmer le paiement", une invitation de paiement de ${formatPrice(totalPrice)} sera envoyée à votre numéro ${activeMethod.name}. Vous la validerez sur votre téléphone.`
                    : "En cliquant sur \"Confirmer le paiement\", vous serez redirigé vers la passerelle sécurisée (CinetPay / Paystack) pour finaliser la transaction par carte."}
                </p>
              </div>

              <Button 
                size="lg" 
                className="w-full h-14 font-bold" 
                onClick={handlePayment}
                disabled={isProcessing || !phoneValid}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                    Traitement en cours…
                  </>
                ) : (
                  `Payer ${formatPrice(totalPrice)} via ${activeMethod.name}`
                )}
              </Button>

              {!phoneValid && (
                <p className="text-center text-xs text-destructive">
                  Saisissez un numéro de téléphone valide (8 chiffres minimum).
                </p>
              )}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <Card className="rounded-xl border border-border  overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-xl font-bold">Votre commande</h2>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 no-scrollbar overscroll-contain">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden shrink-0 border border-border/60">
                      <Image src={item.coverImage} alt={item.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.type}
                        {item.license && <span className="text-primary font-semibold"> - {item.license.name}</span>}
                      </p>
                    </div>
                    <p className="text-sm font-bold tabular">{formatPrice(item.license?.price ?? item.price)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-bold tabular">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-extrabold text-primary tabular">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-green-500 dark:text-green-400" aria-hidden="true" />
                Paiement crypté &amp; sécurisé
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}