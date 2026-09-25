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
    <Card className="group h-full border border-border bg-card hover:border-foreground/25 transition-colors">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        
        <h3 className="mb-2 font-display text-lg font-semibold tracking-tight">
          {service.name}
        </h3>
        
        <p className="mb-6 text-sm text-muted-foreground leading-relaxed flex-grow">
          {service.description}
        </p>
        
        <div className="mt-auto pt-5 border-t border-border flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {service.priceInfo}
          </span>
          <Button variant="ghost" size="sm" className="group/btn text-sm font-medium">
            En savoir plus
            <Icons.ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}