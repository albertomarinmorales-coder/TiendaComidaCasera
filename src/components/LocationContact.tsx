'use client'

import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import Map from './Map'

export default function LocationContact() {
  return (
    <section id="ubicacion" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4 font-playfair">
            Ubicación y Horarios
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden h-[400px]"
          >
            <Map />
          </motion.div>

          {/* Horarios */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 h-[400px] flex flex-col justify-start overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-amber-600" />
              <h3 className="text-2xl font-bold text-amber-800">Horario de Apertura</h3>
            </div>
            
            <div className="space-y-5">
              <div className="border-b border-amber-100 pb-4">
                <h4 className="font-semibold text-amber-800 mb-2">Domingo - Lunes:</h4>
                <p className="text-amber-600 text-lg">12:00 - 16:00</p>
              </div>
              
              <div className="border-b border-amber-100 pb-4">
                <h4 className="font-semibold text-amber-800 mb-2">Martes:</h4>
                <p className="text-amber-600 text-lg">12:00 - 16:00</p>
              </div>
              
              <div className="border-b border-amber-100 pb-4">
                <h4 className="font-semibold text-amber-800 mb-2">Jueves - Sábado:</h4>
                <p className="text-amber-600 text-lg">12:00 - 16:00</p>
              </div>

              <div className="text-amber-700 text-sm italic text-center m-0">
                * Miércoles cerrado
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}