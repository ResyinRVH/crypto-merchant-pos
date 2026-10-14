'use client'

import { useState } from 'react'
import { CartItem, MenuItem } from '@/types/pos'

export function usePosCart() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: '9', name: 'Icecream', category: 'DESSERT', price: 1.5, qty: 2 },
    { id: '1', name: 'Margarita pizza', category: 'PIZZA', price: 10, qty: 1 },
  ])

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === item.id)
      if (exists) {
        return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c))
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.id === id) {
            const nextQty = c.qty + delta
            return nextQty > 0 ? { ...c, qty: nextQty } : null
          }
          return c
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const clearCart = () => setCart([])

  const subtotal = cart.reduce((acc, curr) => acc + curr.qty * curr.price, 0)
  const totalAmount = subtotal.toFixed(2)

  return {
    cart,
    totalAmount,
    handleAddToCart,
    handleUpdateQty,
    clearCart,
  }
}