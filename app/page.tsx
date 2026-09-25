import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Music, ShieldCheck, Zap, Star, Play, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
import { services } from "@/data/services"
import { ProductCard } from "@/components/product/ProductCard"
import { ServiceCard } from "@/components/ServiceCard"
import { categories } from "@/data/constants"

export default function HomePage() {
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-14 items-center py-20 md:py-28">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <BadgeCheck className="h-4 w-4 text-foreground" aria-hidden="true" />
              Beats premium &amp; services sur mesure
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-foreground leading-[1.05]">
              Des sons qui donnent vie à vos idées.
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Découvrez une collection exclusive de beats premium, loops et services musicaux créés pour propulser votre carrière artistique.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button size="lg" className="h-12 px-8 text-base font-medium" asChild>
                <Link href="/shop">Explorer la boutique</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-medium" asChild>
                <Link href="/services">Mes services</Link>
              </Button>
            </div>

            <div className="inline-flex items-center divide-x divide-border">
              <div className="flex flex-col items-center lg:items-start px-6 py-2 first:pl-0">
                <span className="text-2xl font-bold text-foreground tabular">500+</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Beats vendus</span>
              </div>
              <div className="flex flex-col items-center lg:items-start px-6">
                <span className="text-2xl font-bold text-foreground tabular">100%</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Satisfaction</span>
              </div>
              <div className="hidden sm:flex flex-col items-center lg:items-start px-6">
                <span className="text-2xl font-bold text-foreground tabular">24/7</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Support</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-square w-full max-w-[500px] mx-auto overflow-hidden rounded-xl border border-border">
              <Image
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop"
                alt="Studio d'enregistrement"
                fill
                sizes="(min-width: 1024px) 500px, 100vw"
                priority
                className="object-cover"
              />

              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-lg border border-border bg-background/95 p-3">
                <Button
                  size="icon"
                  className="h-11 w-11 rounded-full shrink-0$"
                  aria-label="Écouter Afro Soul Vibe"
                >
                  <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                </Button>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-0.5">En vedette</p>
                  <p className="text-foreground font-display text-sm font-semibold truncate">Afro Soul Vibe (Exclusive)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">Top collection</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">Produits populaires</h2>
          </div>
          <Button variant="link" className="text-foreground font-medium" asChild>
            <Link href="/shop" className="flex items-center gap-2">
              Voir tout <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-border bg-muted/30 py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">Notre catalogue</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Explorez par catégories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quel que soit votre besoin, nous avons les ressources musicales pour vous aider à créer votre prochain hit.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?type=${cat.name}`}
                className="group flex flex-col items-center justify-center gap-3 p-5 bg-background rounded-xl border border-border transition-colors hover:border-foreground/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                  <Music className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="font-display font-semibold text-sm">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1 space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">Plus qu&apos;une boutique</p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Besoin d&apos;un accompagnement personnalisé ?</h2>
            <p className="text-muted-foreground text-lg">
              Je propose des services sur mesure pour les artistes, producteurs et entreprises qui cherchent une identité sonore unique.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <ShieldCheck className="h-5 w-5 text-foreground" aria-hidden="true" />
                <span className="font-medium text-sm">Qualité Studio Professionnelle</span>
              </div>
              <div className="flex items-center gap-4">
                <Zap className="h-5 w-5 text-foreground" aria-hidden="true" />
                <span className="font-medium text-sm">Délais de livraison rapides</span>
              </div>
              <div className="flex items-center gap-4">
                <Star className="h-5 w-5 text-foreground" aria-hidden="true" />
                <span className="font-medium text-sm">Satisfaction garantie à 100&nbsp;%</span>
              </div>
            </div>
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/services">Voir tous mes services</Link>
            </Button>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4">
        <div className="rounded-xl border border-border bg-muted/30 px-8 py-16 md:py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
              Prêt à passer au niveau supérieur ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Commencez à explorer la boutique ou contactez-moi dès aujourd&apos;hui pour discuter de votre projet musical.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button size="lg" className="h-12 px-10 text-base font-medium" asChild>
                <Link href="/services">Démarrer un projet</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-10 text-base font-medium" asChild>
                <Link href="/contact">Me contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}