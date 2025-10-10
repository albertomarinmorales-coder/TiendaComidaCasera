'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const Navbar: React.FC = () => {
    const { cart, getTotalItems, getTotalPrice, addToCart, removeFromCart } = useCart();
    const [showCart, setShowCart] = useState(false);

    return (
        <nav className="bg-amber-800 p-4 shadow-lg relative z-40">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-amber-100 text-lg font-bold font-playfair">
                    <Link href="/">Asador El Buen Comer</Link>
                </div>
                
                <div className="flex items-center space-x-6">
                    <div className="space-x-6">
                        <Link href="/" className="text-amber-100 hover:text-amber-300 transition-colors duration-300 font-medium">Inicio</Link>
                        <Link href="/menu" className="text-amber-100 hover:text-amber-300 transition-colors duration-300 font-medium">Menú</Link>
                        <Link href="/#especialidades" className="text-amber-100 hover:text-amber-300 transition-colors duration-300 font-medium">Especialidades</Link>
                        <Link href="/#ubicacion" className="text-amber-100 hover:text-amber-300 transition-colors duration-300 font-medium">Ubicación</Link>
                    </div>

                    {/* Carrito en Navbar */}
                    <div className="relative">
                        <motion.button
                            onClick={() => setShowCart(!showCart)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative bg-amber-700 hover:bg-amber-600 text-white p-2 rounded-full transition-colors duration-300 flex items-center gap-2"
                        >
                            <ShoppingCart size={20} />
                            {getTotalItems() > 0 && (
                                <>
                                    <span className="text-sm font-medium">
                                        {getTotalItems()} | {getTotalPrice().toFixed(2)}€
                                    </span>
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {getTotalItems()}
                                    </span>
                                </>
                            )}
                        </motion.button>

                        {/* Dropdown del carrito */}
                        <AnimatePresence>
                            {showCart && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    className="absolute right-0 top-12 bg-white rounded-xl shadow-2xl border border-amber-200 w-96 max-h-96 overflow-hidden z-50"
                                >
                                    <div className="p-4 border-b border-amber-200 bg-amber-50">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-amber-800 font-playfair">
                                                Mi Carrito
                                            </h3>
                                            <button
                                                onClick={() => setShowCart(false)}
                                                className="text-amber-600 hover:text-amber-800 text-xl font-bold"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>

                                    <div className="max-h-64 overflow-y-auto p-4">
                                        {cart.length === 0 ? (
                                            <div className="text-center py-6">
                                                <ShoppingCart size={36} className="mx-auto text-amber-300 mb-3" />
                                                <p className="text-amber-600">Tu carrito está vacío</p>
                                                <p className="text-amber-500 text-sm mt-1">
                                                    Añade productos del menú
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {cart.map((item) => (
                                                    <div key={item.id} className="flex items-center gap-3 bg-amber-50 p-2 rounded-lg">
                                                        {item.image && (
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                                            />
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-medium text-amber-900 text-sm truncate">
                                                                {item.name}
                                                            </h4>
                                                            <p className="text-amber-700 text-xs">
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
                                                            <span className="text-amber-800 font-bold min-w-[16px] text-center text-xs">
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
                                        <div className="p-4 border-t border-amber-200 bg-amber-50">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="font-semibold text-amber-800">Total:</span>
                                                <span className="text-lg font-bold text-amber-800">
                                                    {getTotalPrice().toFixed(2)}€
                                                </span>
                                            </div>
                                            <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors duration-300">
                                                Realizar Pedido ({getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'})
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;