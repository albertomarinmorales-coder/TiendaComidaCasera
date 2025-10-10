'use client'

import { useState, useEffect } from 'react'
import { useCart } from '../contexts/CartContext'

interface CartDisplayState {
  totalItems: number
  totalPrice: number
  hasItems: boolean
  isReady: boolean
}

export function useCartDisplay() {
  const { getTotalItems, getTotalPrice, isLoaded, cart } = useCart()
  const [displayState, setDisplayState] = useState<CartDisplayState>({
    totalItems: 0,
    totalPrice: 0,
    hasItems: false,
    isReady: false
  })

  useEffect(() => {
    if (isLoaded) {
      const items = getTotalItems()
      const price = getTotalPrice()
      
      setDisplayState({
        totalItems: items,
        totalPrice: price,
        hasItems: items > 0,
        isReady: true
      })
    }
  }, [isLoaded, cart, getTotalItems, getTotalPrice])

  return displayState
}