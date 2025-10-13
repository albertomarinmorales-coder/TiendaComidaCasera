'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Mail, Car } from 'lucide-react'
import Map from '../../components/Map'

export default function Ubicacion() {
  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4 font-playfair">
            Dónde Estamos
          </h1>
          <p className="text-lg text-amber-700 max-w-3xl mx-auto">
            Comida casera para llevar. Haz tu pedido por teléfono y recógelo en nuestro local.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:items-center">
          {/* Información de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Dirección */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <MapPin className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-800 mb-2 font-playfair">
                    Nuestra Ubicación
                  </h3>
                  <p className="text-amber-700 leading-relaxed">
                    <strong>C. Gavilán, 1, local 1</strong><br />
                    18194 Churriana de la Vega<br />
                    Granada, España
                  </p>
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Clock className="text-amber-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-amber-800 mb-3 font-playfair">
                    Horarios
                  </h3>
                  <div className="space-y-2 text-amber-700">
                    <div className="flex justify-between">
                      <span className="font-medium">Lunes - Viernes:</span>
                      <span>12:00 - 16:00 | 20:00 - 23:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sábados:</span>
                      <span>12:00 - 16:30 | 20:00 - 00:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Domingos:</span>
                      <span>12:00 - 16:30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Phone className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-800 mb-3 font-playfair">
                    Contacto
                  </h3>
                  <div className="space-y-2 text-amber-700">
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      <a href="tel:676453062" className="hover:text-amber-800 transition-colors">
                        676 45 30 62
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      <a href="mailto:info@elbuencomer.es" className="hover:text-amber-800 transition-colors">
                        info@elbuencomer.es
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cómo funciona */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-amber-800 mb-4 font-playfair">
                Cómo Hacer tu Pedido
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="text-amber-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-amber-800">1. Llama por teléfono</p>
                    <p className="text-amber-700 text-sm">
                      Contacta con nosotros al 676 45 30 62
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-amber-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-amber-800">2. Tiempo de preparación</p>
                    <p className="text-amber-700 text-sm">
                      Te indicaremos cuándo estará listo tu pedido
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Car className="text-amber-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-amber-800">3. Recoge en el local</p>
                    <p className="text-amber-700 text-sm">
                      Ven a recoger tu comida cuando te indiquemos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-amber-50 rounded-xl overflow-hidden h-96 flex items-center justify-center py-8 shadow-lg"
          >
            <Map />
          </motion.div>
        </div>

        {/* Pedidos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-amber-800 text-white rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 font-playfair">¿Listo para Pedir?</h3>
            <p className="mb-6 text-amber-100">
              Llámanos para hacer tu pedido. Comida casera preparada al momento para llevar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:676453062"
                className="inline-block bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                📞 Hacer Pedido
              </a>
              <a
                href="/menu"
                className="inline-block bg-white text-amber-800 hover:bg-amber-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Ver Menú
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}