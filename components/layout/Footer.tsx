import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-navy text-navy-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logoipsum-419.png" alt="YisonBits" width={32} height={32} className="rounded-lg" />
            <span className="font-display text-xl font-bold tracking-tight text-white">YisonBeats</span>
            </Link>
            <p className="text-sm text-navy-foreground/70 max-w-xs">
              Votre destination premium pour des beats, instrumentales et services musicaux de haute qualité.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-6">Boutique</h3>
            <ul className="space-y-4 text-sm text-navy-foreground/70">
              <li><Link href="/shop?type=Beats" className="hover:text-primary">Beats</Link></li>
              <li><Link href="/shop?type=Instrumentals" className="hover:text-primary">Instrumentals</Link></li>
              <li><Link href="/shop?type=Samples" className="hover:text-primary">Samples & Loops</Link></li>
              <li><Link href="/shop?type=MIDI" className="hover:text-primary">MIDI Packs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-6">Services</h3>
            <ul className="space-y-4 text-sm text-navy-foreground/70">
              <li><Link href="/services#custom" className="hover:text-primary">Beats sur mesure</Link></li>
              <li><Link href="/services#composition" className="hover:text-primary">Composition</Link></li>
              <li><Link href="/services#piano" className="hover:text-primary">Piano Session</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-6">Newsletter</h3>
            <p className="text-sm text-navy-foreground/70 mb-4">
              Inscrivez-vous pour recevoir les nouveaux beats et offres spéciales.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary/90 text-white p-3 rounded-md transition-colors">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-navy-foreground/50">
          <p>© 2026 YisonBits. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Confidentialité</Link>
            <Link href="/terms" className="hover:text-white">Conditions de vente</Link>
            <Link href="/licenses" className="hover:text-white">Licences</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
