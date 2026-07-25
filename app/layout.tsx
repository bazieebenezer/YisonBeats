import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { cn } from "@/lib/utils"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
})

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins" 
})

export const metadata: Metadata = {
  title: "YIsonBits | Boutique Musicale & Services",
  description: "Boutique de beats, loops, samples et services musicaux par YIsonBits.",
  icons: {
    icon: "/images/logoipsum-419.png",
  },
}

import { AudioProvider } from "@/hooks/use-audio"
import { CartProvider } from "@/hooks/use-cart"
import { GlobalPlayer } from "@/components/player/GlobalPlayer"
import { ErrorBoundary } from "@/components/ErrorBoundary"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
        poppins.variable
      )}>
        <ErrorBoundary>
          <AudioProvider>
            <CartProvider>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <GlobalPlayer />
            </CartProvider>
          </AudioProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
