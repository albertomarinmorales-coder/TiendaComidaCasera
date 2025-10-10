'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface CartItem {
  id: number
  name: string
  price: string
  quantity: number
  image?: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (itemId: number) => void
  getItemQuantity: (itemId: number) => number
  getTotalItems: () => number
  getTotalPrice: () => number
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      } else {
        return prevCart.filter(cartItem => cartItem.id !== itemId)
      }
    })
  }

  const getItemQuantity = (itemId: number): number => {
    const item = cart.find(cartItem => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  const getTotalItems = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = (): number => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(',', '.'))
      return total + (price * item.quantity)
    }, 0)
  }

  const clearCart = () => {
    setCart([])
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    getItemQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}