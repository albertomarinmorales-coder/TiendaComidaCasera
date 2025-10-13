'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, ShoppingCart, Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useCartDisplay } from '../hooks/useCartDisplay'
import Image from 'next/image'
import cartelImage from '../images/cartel.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const { cart, addToCart, removeFromCart, getItemQuantity } = useCart()
  const router = useRouter()
  const cartDisplay = useCartDisplay()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Menú', href: '/menu' },
    { name: 'Ubicación', href: '/ubicacion' },
  ]

  return (
    <header className="bg-amber-50 dark:bg-amber-900 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 rounded-lg shadow-lg border-2 border-amber-600 bg-amber-50 flex items-center justify-center p-1">
              <Image
                src={cartelImage}
                alt="Asador El Buen Comer Logo"
                width={56}
                height={56}
                className="w-14 h-14 rounded-sm shadow-xl"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-amber-800 dark:text-amber-100">
                Asador El Buen Comer
              </h1>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Comida Casera Para Llevar
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-16 lg:space-x-20 xl:space-x-24 flex-1 justify-center max-w-2xl mx-auto" style={{ marginLeft: '65px' }}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors duration-200 whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Carrito y Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Carrito - Ahora visible en todas las pantallas */}
            <div className="relative">
              <motion.button
                onClick={() => setShowCart(!showCart)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition-colors flex items-center gap-2 shadow-lg"
              >
                <ShoppingCart size={20} />
                {cartDisplay.isReady && cartDisplay.hasItems && (
                  <>
                    <span className="text-sm font-medium hidden sm:block">
                      {cartDisplay.totalItems} | {cartDisplay.totalPrice.toFixed(2)}€
                    </span>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {cartDisplay.totalItems}
                    </span>
                  </>
                )}
              </motion.button>

              {/* Dropdown del carrito */}
              <AnimatePresence>
                {showCart && cartDisplay.isReady && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-amber-200 dark:border-amber-700 w-96 max-h-96 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-amber-800 dark:text-amber-100">
                            Mi Carrito
                          </h3>
                          <button
                            onClick={() => setShowCart(false)}
                            className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200 text-xl font-bold"
                          >
                            ×
                          </button>
                        </div>
                      </div>

                      <div className="max-h-64 overflow-y-auto p-4">
                        {cart.length === 0 ? (
                          <div className="text-center py-6">
                            <ShoppingCart size={36} className="mx-auto text-amber-300 mb-3" />
                            <p className="text-amber-600 dark:text-amber-400">Tu carrito está vacío</p>
                            <p className="text-amber-500 text-sm mt-1">
                              Añade productos del menú
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {cart.map((item) => (
                              <div key={item.id} className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900 p-2 rounded-lg">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-amber-900 dark:text-amber-100 text-sm truncate">
                                    {item.name}
                                  </h4>
                                  <p className="text-amber-700 dark:text-amber-300 text-xs">
                                    {item.price}€ × {item.quantity} = {(parseFloat(item.price.replace(',', '.')) * item.quantity).toFixed(2)}€
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-amber-600 hover:bg-amber-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs"
                                  >
                                    <Minus size={10} />
                                  </button>
                                  <span className="text-amber-800 dark:text-amber-200 font-bold min-w-[16px] text-center text-xs">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => addToCart(item)}
                                    className="bg-amber-600 hover:bg-amber-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs"
                                  >
                                    <Plus size={10} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {cart.length > 0 && (
                        <div className="p-4 border-t border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-amber-800 dark:text-amber-200">Total:</span>
                            <span className="text-lg font-bold text-amber-800 dark:text-amber-100">
                              {cartDisplay.totalPrice.toFixed(2)}€
                            </span>
                          </div>
                          <button 
                            onClick={() => {
                              setShowCart(false);
                              router.push('/pedido');
                            }}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors duration-300"
                          >
                            Realizar Pedido ({cartDisplay.totalItems} {cartDisplay.totalItems === 1 ? 'producto' : 'productos'})
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>

            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg bg-amber-100 dark:bg-amber-800 text-amber-700 dark:text-amber-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}