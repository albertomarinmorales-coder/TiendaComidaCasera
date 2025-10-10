'use client'

import { motion } from 'framer-motion'

export default function Specialties() {
  const specialties = [
    {
      id: 1,
      title: "Pollos asados o a la brasa",
      description: "Deliciosos pollos cocinados a la brasa, jugosos por dentro y crujientes por fuera",
      image: "/images/pollo.jpg"
    },
    {
      id: 2, 
      title: "Menú del día",
      description: "Diferentes opciones cada día, preparadas con ingredientes frescos y de temporada",
      image: "/images/menu.jpg"
    },
    {
      id: 3,
      title: "Comida Casera",
      description: "Platos tradicionales con el auténtico sabor de casa, elaborados con recetas familiares",
      image: "/images/casera.jpg"
    }
  ]

  return (
    <section className="py-16 bg-amber-50 dark:bg-amber-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 dark:text-amber-100 mb-4 font-playfair">
            Nuestras Especialidades
          </h2>
          <p className="text-lg text-amber-700 dark:text-amber-200 max-w-2xl mx-auto">
            Descubre los sabores auténticos de nuestra cocina tradicional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white dark:bg-amber-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-100 mb-3 font-playfair">
                  {item.title}
                </h3>
                <p className="text-amber-700 dark:text-amber-200 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
            Ver Menú Completo
          </button>
        </motion.div>
      </div>
    </section>
  )
}