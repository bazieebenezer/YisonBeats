"use client"

import * as React from "react"
import { Product } from "@/data/products"
import { LicenseInCart } from "@/data/licenses"

interface CartItem extends Product {
  quantity: number
  license?: LicenseInCart
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, license?: LicenseInCart) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  totalCount: number
  totalPrice: number
}

const CartContext = React.createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([])

  React.useEffect(() => {
    const savedCart = localStorage.getItem("yisonbits-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart", e)
      }
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem("yisonbits-cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, license?: LicenseInCart) => {
    if (product.isFree) return // Don't add free items to cart, they are direct downloads

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        if (license && existing.license?.id !== license.id) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, license } : item
          )
        }
        return prev
      }
      return [...prev, { ...product, quantity: 1, license }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => setItems([])

  const totalCount = items.length
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.license?.price ?? item.price),
    0
  )

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearCart,
      totalCount,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = React.useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}