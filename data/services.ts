export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  longDescription: string;
  priceInfo: string;
}

export const services: Service[] = [
  {
    id: "creation-de-beats",
    name: "Création de beats sur mesure",
    icon: "music",
    description: "Un beat unique créé spécialement pour votre projet artistique.",
    longDescription: "Je crée pour vous une instrumentale originale adaptée à votre style et à votre vision artistique. Livraison en pistes séparées (stems) incluse. Que vous soyez rappeur, chanteur ou créateur de contenu, votre beat sera 100% unique et adapté à vos besoins.",
    priceInfo: "À partir de 50 000 FCFA"
  },
  {
    id: "composition",
    name: "Composition musicale",
    icon: "audio-waveform",
    description: "Composition complète pour chansons, films ou publicités.",
    longDescription: "De la mélodie à l'arrangement complet, je compose la musique qui donnera vie à vos images ou à vos paroles. Spécialisé dans les musiques africaines modernes et traditionnelles, je m'adapte à tous les styles et tous les formats.",
    priceInfo: "Sur devis"
  },
  {
    id: "piano",
    name: "Accompagnement Piano",
    icon: "keyboard",
    description: "Enregistrement de pistes de piano professionnelles pour vos productions.",
    longDescription: "Besoin d'un piano acoustique, électrique ou synthétique sur votre titre ? Je joue et j'enregistre des pistes de qualité studio pour vous. Du jazz au gospel en passant par la pop et l'afrobeat, je m'adapte à votre univers musical.",
    priceInfo: "25 000 FCFA / titre"
  },
  {
    id: "production",
    name: "Production musicale complète",
    icon: "settings",
    description: "Direction artistique et production de votre single ou EP de A à Z.",
    longDescription: "Je vous accompagne tout au long de la création de votre projet musical, de la composition au mixage final. Direction artistique, choix des instruments, arrangements, mixage et mastering : je gère tout pour vous offrir un résultat professionnel.",
    priceInfo: "Sur devis"
  },
  {
    id: "arrangement",
    name: "Arrangement musical",
    icon: "git-branch",
    description: "Arrangement et orchestration de vos chansons et compositions.",
    longDescription: "Vous avez une maquette ou une idée ? Je l'arrange et l'orchestre pour lui donner toute sa dimension. Ajout d'instruments, structuration, harmonies : je transforme votre esquisse en véritable production.",
    priceInfo: "À partir de 35 000 FCFA"
  },
  {
    id: "mixage-mastering",
    name: "Mixage & Mastering",
    icon: "sliders-horizontal",
    description: "Mixage et mastering professionnel de vos pistes audio.",
    longDescription: "Donnez à vos productions un son professionnel et compétitif. Je mixe et masterise vos chansons avec soin, en respectant l'identité sonore de votre projet. Préparation pour les plateformes de streaming incluse.",
    priceInfo: "Sur devis"
  },
];
