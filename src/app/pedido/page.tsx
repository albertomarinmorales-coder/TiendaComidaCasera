'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../../contexts/CartContext'
import { ShoppingBag, User, Phone, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PedidoPage() {
  const { cart, getTotalPrice, getTotalItems } = useCart()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    alergenos: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Formatear el pedido para WhatsApp
    const pedidoTexto = formatearPedidoWhatsApp()
    
    // Abrir WhatsApp con el pedido
    const whatsappUrl = `https://wa.me/34676453062?text=${encodeURIComponent(pedidoTexto)}`
    window.open(whatsappUrl, '_blank')

    setIsSubmitting(false)
  }

  const formatearPedidoWhatsApp = () => {
    let texto = `🍽️ *NUEVO PEDIDO - RECOGIDA EN TIENDA*\n\n`
    
    // Datos del cliente
    texto += `👤 *DATOS DEL CLIENTE:*\n`
    texto += `• Nombre: ${formData.nombre} ${formData.apellido}\n`
    texto += `• Teléfono: ${formData.telefono}\n\n`
    
    // Productos del pedido
    texto += `📋 *PEDIDO:*\n`
    cart.forEach((item, index) => {
      texto += `${index + 1}. ${item.name}\n`
      texto += `   Cantidad: ${item.quantity}\n`
      texto += `   Precio unitario: ${item.price}€\n`
      texto += `   Subtotal: ${(parseFloat(item.price.replace(',', '.')) * item.quantity).toFixed(2)}€\n\n`
    })
    
    // Total
    texto += `💰 *TOTAL: ${getTotalPrice().toFixed(2)}€*\n\n`
    
    // Alergenos y solicitudes especiales
    if (formData.alergenos.trim()) {
      texto += `⚠️ *ALERGENOS Y SOLICITUDES ESPECIALES:*\n${formData.alergenos}\n\n`
    }
    
    texto += `📍 *MODALIDAD:* Recogida en tienda\n`
    texto += `⏰ Por favor, confirme el tiempo de preparación.\n\n`
    texto += `¡Gracias por su pedido! 😊`
    
    return texto
  }

  const isFormValid = formData.nombre && formData.apellido && formData.telefono

  // Si el carrito está vacío, redirigir al menú
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="w-16 h-16 text-amber-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-amber-800 mb-4">Tu carrito está vacío</h2>
          <p className="text-amber-600 mb-8">Añade algunos productos antes de realizar un pedido.</p>
          <motion.button
            onClick={() => router.push('/menu')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Ver Menú
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-800 font-playfair">
            Tramitar Pedido
          </h1>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-amber-200"
          >
            <h2 className="text-xl font-semibold text-amber-800 mb-6 font-playfair flex items-center">
              <User className="w-5 h-5 mr-2" />
              Datos del Cliente
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-amber-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="apellido" className="block text-sm font-medium text-amber-700 mb-2">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    required
                    value={formData.apellido}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="Tu apellido"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="telefono" className="text-sm font-medium text-amber-700 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  placeholder="676 453 062"
                />
              </div>

              <div>
                <label htmlFor="alergenos" className="text-sm font-medium text-amber-700 mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  Alergenos y Solicitudes Especiales
                </label>
                <textarea
                  id="alergenos"
                  name="alergenos"
                  rows={4}
                  value={formData.alergenos}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
                  placeholder="Indica aquí cualquier alergia alimentaria o solicitud especial para tu pedido..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                whileHover={isFormValid ? { scale: 1.02 } : {}}
                whileTap={isFormValid ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isFormValid 
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Enviando pedido...</span>
                  </>
                ) : (
                  <>
                    <span>📱 Enviar Pedido por WhatsApp</span>
                  </>
                )}
              </motion.button>

              <p className="text-sm text-amber-600 text-center">
                * Campos obligatorios
              </p>
            </form>
          </motion.div>

          {/* Resumen del pedido */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-amber-200"
          >
            <h2 className="text-xl font-semibold text-amber-800 mb-6 font-playfair flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Resumen del Pedido
            </h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 border-b border-amber-100 pb-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-amber-900 text-sm">
                      {item.name}
                    </h4>
                    <p className="text-amber-700 text-xs">
                      {item.price}€ × {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-amber-800">
                    {(parseFloat(item.price.replace(',', '.')) * item.quantity).toFixed(2)}€
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-amber-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-amber-700">
                  Total productos ({getTotalItems()})
                </span>
                <span className="font-semibold text-amber-800">
                  {getTotalPrice().toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-amber-800">
                <span>Total a pagar</span>
                <span>{getTotalPrice().toFixed(2)}€</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-2">📍 Modalidad: Recogida en Tienda</h3>
              <p className="text-sm text-amber-700">
                Tu pedido estará listo para recoger en nuestro local. 
                Te confirmaremos el tiempo de preparación por WhatsApp.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}