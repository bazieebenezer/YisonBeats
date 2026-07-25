import Link from "next/link"
import { Music, Headphones, Award, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="pb-20">
      <section className="bg-navy py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full -ml-48 -mb-48" />
        </div>
        <div className="container relative z-10 space-y-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">À Propos</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Découvrez l&apos;histoire et la passion derrière YIsonBits.
          </p>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden border">
            <img
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop"
              alt="Studio YIsonBits"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-widest">
              <Music className="h-4 w-4" /> Mon histoire
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              La Musique Est Mon <span className="text-primary">Langage</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Bienvenue sur YIsonBits, votre destination premium pour des beats, instrumentales et services musicaux de haute qualité. Je suis un beatmaker, pianiste et producteur passionné par la création musicale.
              </p>
              <p>
                Mon objectif est de fournir aux artistes, créateurs de contenu et professionnels de l&apos;audiovisuel des sons uniques et authentiques qui élèveront leurs projets au niveau supérieur.
              </p>
              <p>
                Chaque beat, chaque loop, chaque composition est créée avec soin et attention aux détails, en m&apos;inspirant des riches traditions musicales africaines tout en intégrant les sonorités modernes.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/shop">Explorer mon travail</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-20 border-t">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold">Pourquoi Choisir Yi-sonBeats ?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            La qualité, l&apos;authenticité et la passion au service de votre musique.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Headphones, title: "Qualité Studio", desc: "Des enregistrements et mixages de qualité professionnelle pour un son irréprochable." },
            { icon: Award, title: "Créations Originales", desc: "Chaque beat est unique et créé à partir de zéro, reflétant une identité musicale authentique." },
            { icon: Star, title: "Satisfaction Garantie", desc: "Je m'engage à vous fournir un service de qualité et à répondre à vos besoins spécifiques." },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="p-8 rounded-2xl border bg-white space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="container px-4">
        <div className="relative rounded-[2rem] bg-navy overflow-hidden px-8 py-20 text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="font-display text-4xl font-extrabold text-white">
              Prêt à créer ensemble ?
            </h2>
            <p className="text-lg text-white/60">
              Que vous ayez besoin d&apos;un beat personnalisé, d&apos;une composition originale ou d&apos;un accompagnement musical, je suis là pour vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 px-10 text-base font-bold" asChild>
                <Link href="/services">Mes services</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-base font-bold border-white/10 text-white hover:bg-white/5" asChild>
                <Link href="/contact">Me contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
