import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "YIsonBits | Boutique Musicale & Services",
  description: "Boutique de beats, loops, samples et services musicaux par YIsonBits.",
  icons: {
    icon: "/images/logoipsum-419.png",
  },
}

export const viewport = {
  themeColor: "#ffffff",
}

import { AudioProvider } from "@/hooks/use-audio"
import { CartProvider } from "@/hooks/use-cart"
import { GlobalPlayer } from "@/components/player/GlobalPlayer"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { ThemeProvider } from "@/hooks/use-theme"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
        >
          Aller au contenu principal
        </a>
        <ThemeProvider>
          <ErrorBoundary>
            <AudioProvider>
              <CartProvider>
              <div className="relative flex min-h-screen flex-col pb-20">
                <Header />
                <main id="contenu" className="flex-1">{children}</main>
                <Footer />
              </div>
              <GlobalPlayer />
            </CartProvider>
          </AudioProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
