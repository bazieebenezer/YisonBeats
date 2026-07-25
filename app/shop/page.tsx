import { Suspense } from "react"
import ShopContent from "@/components/ShopContent"

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" /></div>}>
      <ShopContent />
    </Suspense>
  )
}
