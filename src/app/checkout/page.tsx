'use client'

import { useCart } from '../../contexts/CartContext'
import { motion } from 'framer-motion'
import { ShoppingBag, Trash2, Plus, Minus, Phone, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CheckoutPage() {
  const { cart, addToCart, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    })
    
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSubmitOrder = () => {
    // Validar campos
    const newErrors = {
      name: '',
      phone: ''
    }
    
    if (!customerInfo.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    }
    
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio'
    }
    
    // Si hay errores, actualizar el estado y no continuar
    if (newErrors.name || newErrors.phone) {
      setErrors(newErrors)
      return
    }

    // Formatear mensaje para WhatsApp
    let message = `*NUEVO PEDIDO*%0A%0A`
    message += `*Cliente:* ${customerInfo.name}%0A`
    message += `*Teléfono:* ${customerInfo.phone}%0A`
    if (customerInfo.email) message += `*Email:* ${customerInfo.email}%0A`
    if (customerInfo.address) message += `*Dirección:* ${customerInfo.address}%0A`
    message += `%0A*PEDIDO:*%0A`
    
    cart.forEach((item) => {
      const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price
      message += `%0A• ${item.name} x${item.quantity}%0A`
      message += `  Precio: ${(itemPrice * item.quantity).toFixed(2)}€%0A`
    })
    
    message += `%0A*TOTAL: ${getTotalPrice().toFixed(2)}€*%0A`
    
    if (customerInfo.notes) {
      message += `%0A*Notas:* ${customerInfo.notes}%0A`
    }

    // Número de WhatsApp (cambia por el número real del restaurante)
    const whatsappNumber = '34512510344' // Formato: código país + número
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
    
    setIsSubmitting(true)
    
    // Pequeño delay para mostrar el estado de carga
    setTimeout(() => {
      window.open(whatsappUrl, '_blank')
      setIsSubmitting(false)
    }, 500)
    
    // Opcional: limpiar carrito después de enviar
    // clearCart()
    // router.push('/')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <ShoppingBag className="w-24 h-24 mx-auto text-amber-400 mb-6" />
            <h1 className="text-3xl font-bold text-amber-800 mb-4 font-playfair">
              Tu carrito está vacío
            </h1>
            <p className="text-amber-600 mb-8">
              Añade productos desde nuestro menú para realizar un pedido
            </p>
            <button
              onClick={() => router.push('/menu')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Ver Menú
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-amber-800 mb-8 text-center font-playfair">
            Finalizar Pedido
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Columna izquierda - Productos del carrito */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-amber-800 mb-4 font-playfair">
                  Tu Pedido ({getTotalItems()} productos)
                </h2>
                
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {cart.map((item) => {
                    const itemPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(',', '.')) : item.price
                    return (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-amber-800">{item.name}</h3>
                        <p className="text-sm text-amber-600">{itemPrice.toFixed(2)}€ c/u</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 bg-amber-200 hover:bg-amber-300 active:bg-amber-400 rounded-full transition-all duration-150 shadow-sm transform hover:scale-110 active:scale-100"
                        >
                          <Minus className="w-4 h-4 text-amber-800" />
                        </button>
                        <span className="w-8 text-center font-semibold text-amber-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-2 bg-amber-200 hover:bg-amber-300 active:bg-amber-400 rounded-full transition-all duration-150 shadow-sm transform hover:scale-110 active:scale-100"
                        >
                          <Plus className="w-4 h-4 text-amber-800" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-amber-800">
                          {(itemPrice * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </motion.div>
                    )
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-amber-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-amber-800">Total:</span>
                    <span className="text-2xl font-bold text-amber-600">
                      {getTotalPrice().toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Información del cliente */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-amber-800 mb-6 font-playfair">
                  Información de Contacto
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.name 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-amber-200 focus:ring-amber-500'
                      }`}
                      placeholder="Tu nombre"
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">
                      Teléfono *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.phone 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-amber-200 focus:ring-amber-500'
                        }`}
                        placeholder="512 510 344"
                        required
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">
                      Email (opcional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">
                      Dirección de entrega (opcional)
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-amber-400 w-5 h-5" />
                      <input
                        type="text"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Calle, número, piso..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">
                      Notas adicionales (opcional)
                    </label>
                    <textarea
                      name="notes"
                      value={customerInfo.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      placeholder="Alergias, preferencias, hora de recogida..."
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
                      isSubmitting 
                        ? 'bg-green-400 cursor-not-allowed border-b-4 border-green-500' 
                        : 'bg-green-600 hover:bg-green-700 active:bg-green-800 border-b-4 border-green-800 hover:border-green-900 transform hover:-translate-y-0.5 active:translate-y-0'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Phone className="w-5 h-5" />
                        Enviar Pedido por WhatsApp
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => router.push('/menu')}
                    className="w-full bg-amber-100 hover:bg-amber-200 active:bg-amber-300 text-amber-800 py-3 rounded-lg font-semibold transition-all duration-200 border-2 border-amber-300 hover:border-amber-400 shadow-sm hover:shadow-md"
                  >
                    Seguir Comprando
                  </button>
                </div>

                <p className="text-sm text-amber-600 text-center mt-4">
                  * Campos obligatorios
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
