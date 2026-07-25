import { Service } from "@/data/services"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import * as Icons from "lucide-react"
import { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  // Dynamic icon resolution
  const Icon = (Icons as any)[service.icon.charAt(0).toUpperCase() + service.icon.slice(1).replace(/-([a-z])/g, (g: any) => g[1].toUpperCase())] as LucideIcon || Icons.Music

  return (
    <Card className="group h-full border border-border/50 bg-card hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-8 flex flex-col h-full">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          <Icon className="h-6 w-6" />
        </div>
        
        <h3 className="mb-3 font-display text-xl font-bold tracking-tight">
          {service.name}
        </h3>
        
        <p className="mb-8 text-sm text-muted-foreground leading-relaxed flex-grow">
          {service.description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {service.priceInfo}
          </span>
          <Button variant="ghost" size="sm" className="group/btn text-xs font-bold">
            En savoir plus
            <Icons.ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
