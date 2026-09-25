import { Mail, MessageSquare, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="pb-20">
      <section className="container py-16 md:py-24">
        <div className="space-y-5 text-center max-w-3xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">Restons en contact</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Contact</h1>
          <p className="text-xl text-muted-foreground">
            Une question, un projet ? Je suis à votre écoute.
          </p>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold">Parlons de votre projet</h2>
              <p className="text-muted-foreground">
                Que vous soyez un artiste, un producteur ou une entreprise, je serais ravi de discuter de votre projet musical. N&apos;hésitez pas à me contacter via le formulaire ou directement par les moyens ci-contre.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Nom</label>
                  <input id="name" name="name" type="text" autoComplete="name" className="h-11 w-full rounded-lg border border-border bg-card px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20" placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" className="h-11 w-full rounded-lg border border-border bg-card px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20" placeholder="votre@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Sujet</label>
                <input id="subject" name="subject" type="text" className="h-11 w-full rounded-lg border border-border bg-card px-4 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20" placeholder="Sujet de votre message" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Message</label>
                <textarea id="message" name="message" rows={6} className="w-full rounded-xl border border-border bg-card px-4 py-3 transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Votre message…" />
              </div>
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 font-bold">
                Envoyer le message
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border/60 bg-card flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <MessageSquare className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">WhatsApp</p>
                <p className="font-bold sm:text-lg">+226 00 00 00 00</p>
                <p className="text-sm text-muted-foreground">Réponse sous 24h</p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border/60 bg-card flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Mail className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0 break-words">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Email</p>
                <p className="font-bold sm:text-lg">contact@yisonbits.com</p>
                <p className="text-sm text-muted-foreground">Réponse sous 48h</p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border/60 bg-card flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Localisation</p>
                <p className="font-bold">Ouagadougou, Burkina Faso</p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border/60 bg-card flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Disponibilité</p>
                <p className="font-bold">Lun - Ven : 9h - 18h</p>
                <p className="text-sm text-muted-foreground">Week-end : Sur rendez-vous</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
