import { services } from "@/data/services"
import { ServiceCard } from "@/components/ServiceCard"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Phone } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-navy py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full -mr-48 -mt-48" />
        </div>
        
        <div className="container relative z-10 space-y-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Mes services musicaux</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
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
        <div className="rounded-[3rem] bg-slate-50 dark:bg-gray-950 border p-12 md:p-20 flex flex-col md:flex-row gap-12 items-center">
          <div className="space-y-6 flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Un projet spécifique en tête ?</h2>
            <p className="text-lg text-muted-foreground">
              Chaque projet est unique. Contactez-moi directement pour discuter de vos besoins et obtenir un devis personnalisé adapté à votre budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Button size="lg" className="h-14 px-8 font-bold gap-2">
                <MessageSquare className="h-5 w-5" /> Discuter sur WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 font-bold gap-2">
                <Mail className="h-5 w-5" /> M'envoyer un email
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 space-y-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-950 border flex items-center gap-4">
              <div className="h-12 w-12 p-6 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Téléphone</p>
                <p className="font-bold">+226 00 00 00 00</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-950 border flex items-center gap-4">
              <div className="h-12 w-12 p-6 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Email</p>
                <p className="font-bold">contact@yisonbits.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
