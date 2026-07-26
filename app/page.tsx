import Link from "next/link"
import { ArrowRight, Music, AudioWaveform, Headphones, Play, ShieldCheck, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
import { services } from "@/data/services"
import { ProductCard } from "@/components/product/ProductCard"
import { ServiceCard } from "@/components/ServiceCard"
import { categories } from "@/data/constants"

export default function HomePage() {
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-navy">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary" />
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            {/*<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white">
              <span className="flex h-2 w-2 rounded-xl bg-primary animate-pulse" />
              Nouveaux beats disponibles
            </div>*/}
            
            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white leading-[1.1]">
              Des sons qui <span className="text-primary">donnent vie</span> à vos idées.
            </h1>
            
            <p className="text-lg text-white/60 max-w-xl mx-auto lg:mx-0">
              Découvrez une collection exclusive de beats premium, loops et services musicaux créés pour propulser votre carrière artistique.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="h-14 px-8 text-base font-bold" asChild>
                <Link href="/shop">Explorer la boutique</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold border-white/10 dark:border-gray-800 text-black hover:bg-white/5 dark:hover:bg-gray-800 dark:text-white hover:text-white" asChild>
                <Link href="/services">Mes services</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-white">500+</span>
                <span className="text-xs uppercase tracking-widest text-white/40">Beats vendus</span>
              </div>
              <div className="w-px h-8 bg-white/10 dark:bg-gray-800" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-white">100%</span>
                <span className="text-xs uppercase tracking-widest text-white/40">Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-square w-full max-w-[500px] mx-auto rounded-3xl overflow-hidden border border-white/10 dark:border-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop" 
                alt="Studio" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-2xl flex items-center gap-4 border-white/10 dark:border-gray-800">
                <Button size="icon" className="h-12 w-12 rounded-full shrink-0">
                  <Play className="h-6 w-6 fill-current" />
                </Button>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">En vedette</p>
                  <p className="text-white font-display text-lg font-bold truncate">Afro Soul Vibe (Exclusive)</p>
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
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Top collection</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">Produits populaires</h2>
          </div>
          <Button variant="link" className="text-primary font-bold" asChild>
            <Link href="/shop" className="flex items-center gap-2">
              Voir tout <ArrowRight className="h-4 w-4" />
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
      <section className="bg-slate-50 dark:bg-gray-950 py-20 border-y">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
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
                className="group flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-950 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="mb-4 text-muted-foreground group-hover:text-primary transition-colors">
                  {/* We would render actual icons here */}
                  <Music className="h-8 w-8" />
                </div>
                <span className="font-display font-bold text-sm">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1 space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Plus qu'une boutique</p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Besoin d'un accompagnement personnalisé ?</h2>
            <p className="text-muted-foreground text-lg">
              Je propose des services sur mesure pour les artistes, producteurs et entreprises qui cherchent une identité sonore unique.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="font-bold text-sm">Qualité Studio Professionnelle</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="font-bold text-sm">Délais de livraison rapides</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Star className="h-5 w-5" />
                </div>
                <span className="font-bold text-sm">Satisfaction garantie à 100%</span>
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
        <div className="relative rounded-[2rem] bg-primary overflow-hidden px-8 py-20 md:py-24 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy rounded-full -ml-48 -mb-48" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="font-display text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              Prêt à passer au <span className="text-navy underline decoration-navy/20">niveau supérieur</span> ?
            </h2>
            <p className="text-xl text-white/80">
              Commencez à explorer la boutique ou contactez-moi dès aujourd'hui pour discuter de votre projet musical.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="navy" className="h-14 px-10 text-base font-bold">
                Démarrer un projet
              </Button>
              <Button size="lg" className="h-14 px-10 text-base font-bold bg-white text-primary hover:bg-white/90">
                Me contacter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
