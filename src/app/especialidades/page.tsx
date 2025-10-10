'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Especialidades() {
  const especialidades = [
    {
      id: 1,
      name: 'Pollo a la Brasa',
      description: 'Nuestro plato estrella. Pollo marinado con hierbas aromáticas y cocinado lentamente a la leña.',
      image: '/images/menu/pollo-brasa.jpg',
      price: '11,00€',
      destacado: true
    },
    {
      id: 2,
      name: 'Secreto a la Brasa',
      description: 'Secreto de cerdo ibérico a la brasa con patatas fritas y alioli casero.',
      image: '/images/menu/secreto.jpg',
      price: '20,95€',
      destacado: true
    },
    {
      id: 3,
      name: 'Salmorejo Tradicional',
      description: 'Salmorejo cordobés con jamón ibérico y huevo duro, preparado según la receta tradicional.',
      image: '/images/menu/salmorejo.jpg',
      price: '6,00€',
      destacado: false
    }
  ]

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
            Nuestras Especialidades
          </h1>
          <p className="text-lg text-amber-700 max-w-3xl mx-auto">
            Nuestros platos más populares preparados con ingredientes frescos. 
            Llama para hacer tu pedido y recoge en nuestro local.
          </p>
        </motion.div>

        {/* Especialidades Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {especialidades.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ${
                item.destacado ? 'ring-2 ring-amber-400 ring-opacity-50' : ''
              }`}
            >
              {/* Imagen */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-2 font-playfair">
                  {item.name}
                </h3>
                <p className="text-amber-700 mb-4 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-800">
                    {item.price}
                  </span>
                  <button
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Ver en Menú
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-amber-800 text-white rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 font-playfair">¿Te apetece probarlo?</h3>
            <p className="mb-6 text-amber-100">
              Haz tu pedido por teléfono y recoge en nuestro local. ¡Comida casera al momento!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:676453062"
                className="inline-block bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                📞 676 45 30 62
              </a>
              <a
                href="/menu"
                className="inline-block bg-white text-amber-800 hover:bg-amber-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Ver Menú Completo
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}