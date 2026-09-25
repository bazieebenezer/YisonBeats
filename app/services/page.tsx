import { services } from "@/data/services"
import { ServiceCard } from "@/components/ServiceCard"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Phone } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="space-y-5 text-center max-w-3xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">Services sur mesure</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Mes services musicaux</h1>
          <p className="text-xl text-muted-foreground">
            De la création de beats au mixage final, je vous accompagne dans toutes les étapes de votre production musicale.
          </p>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="container">
        <div className="rounded-xl bg-muted/50 border border-border/60 p-12 md:p-20 flex flex-col md:flex-row gap-12 items-center">
          <div className="space-y-6 flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Un projet spécifique en tête ?</h2>
            <p className="text-lg text-muted-foreground">
              Chaque projet est unique. Contactez-moi directement pour discuter de vos besoins et obtenir un devis personnalisé adapté à votre budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Button size="lg" className="h-14 px-8 font-bold gap-2">
                <MessageSquare className="h-5 w-5" aria-hidden="true" /> Discuter sur WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 font-bold gap-2">
                <Mail className="h-5 w-5" aria-hidden="true" /> M&apos;envoyer un email
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 space-y-4">
            <div className="p-6 rounded-xl bg-card border border-border/60 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Phone className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Téléphone</p>
                <p className="font-bold sm:text-lg">+226 00 00 00 00</p>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border/60 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Mail className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0 break-words">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Email</p>
                <p className="font-bold sm:text-lg">contact@yisonbits.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
