export type LicenseId = "mp3-lease" | "wav-lease" | "exclusive"

export interface LicenseOption {
  id: LicenseId
  name: string
  tagline: string
  description: string
  priceMultiplier: number
  premium?: boolean
  features: string[]
}

export interface LicenseInCart {
  id: LicenseId
  name: string
  price: number
}

export const licenseOptions: LicenseOption[] = [
  {
    id: "mp3-lease",
    name: "MP3 Lease",
    tagline: "Fichier MP3 + tag audio",
    description: "Le plus accessible pour tester vos projets et les publier en ligne.",
    priceMultiplier: 1,
    features: [
      "Fichier MP3 320 kbps",
      "Tag audio de crédit",
      "Streaming & réseaux sociaux illimités",
      "Crédit au producteur requis",
    ],
  },
  {
    id: "wav-lease",
    name: "WAV Lease",
    tagline: "WAV 24-bit sans tag",
    description: "La licence la plus populaire pour les artistes en activité.",
    priceMultiplier: 2,
    premium: true,
    features: [
      "Fichier WAV 24-bit de haute qualité",
      "Sans tag audio",
      "Streaming, vidéos & spectacles",
      "Crédit au producteur requis",
    ],
  },
  {
    id: "exclusive",
    name: "Licence Exclusive",
    tagline: "Droits complets, beat retiré de la vente",
    description: "Devenez propriétaire unique du beat. Contrat et stems inclus.",
    priceMultiplier: 6,
    features: [
      "Master WAV 24-bit + stems séparés",
      "Beat retiré de la vente",
      "Droits commerciaux illimités",
      "Contrat de cession (PDF)",
    ],
  },
]

export const LICENSE_TYPES = ["Beats", "Instrumentals"]

export function supportsLicenses(product: { type: string }): boolean {
  return LICENSE_TYPES.includes(product.type)
}

export function getLicensePrice(basePrice: number, multiplier: number): number {
  return Math.round((basePrice * multiplier) / 500) * 500
}

export function getDefaultLicense(product: {
  type: string
  price: number
}): LicenseInCart | undefined {
  if (!supportsLicenses(product)) return undefined
  const lic = licenseOptions[0]
  return {
    id: lic.id,
    name: lic.name,
    price: getLicensePrice(product.price, lic.priceMultiplier),
  }
}

export function getLicenseById(id: LicenseId): LicenseOption {
  return licenseOptions.find((l) => l.id === id) ?? licenseOptions[0]
}