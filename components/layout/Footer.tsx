import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react"

const socials = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logoipsum-419.png" alt="YisonBits" width={32} height={32} className="rounded-lg" />
              <span className="font-display text-lg font-bold tracking-tight">
                Yison<span className="text-foreground">Beats</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Votre destination premium pour des beats, instrumentales et services musicaux de haute qualité.
            </p>
            <div className="flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold mb-5">Boutique</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/shop?type=Beats" className="transition-colors hover:text-foreground">Beats</Link></li>
              <li><Link href="/shop?type=Instrumentals" className="transition-colors hover:text-foreground">Instrumentals</Link></li>
              <li><Link href="/shop?type=Samples" className="transition-colors hover:text-foreground">Samples &amp; Loops</Link></li>
              <li><Link href="/shop?type=MIDI" className="transition-colors hover:text-foreground">MIDI Packs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold mb-5">Services</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/services#custom" className="transition-colors hover:text-foreground">Beats sur mesure</Link></li>
              <li><Link href="/services#composition" className="transition-colors hover:text-foreground">Composition</Link></li>
              <li><Link href="/services#piano" className="transition-colors hover:text-foreground">Piano Session</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold mb-5">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Inscrivez-vous pour recevoir les nouveaux beats et offres spéciales.
            </p>
            <form className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Adresse email</label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Votre email"
                className="w-full rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-sm transition-colors focus:border-foreground/40 focus:ring-2 focus:ring-ring/20 placeholder:text-muted-foreground"
              />
              <button type="submit" aria-label="S'inscrire à la newsletter" className="shrink-0 rounded-lg bg-primary p-2.5 text-primary-foreground transition-colors hover:bg-primary/90">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 YisonBits. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-foreground">Confidentialité</Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">Conditions de vente</Link>
            <Link href="/licenses" className="transition-colors hover:text-foreground">Licences</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}