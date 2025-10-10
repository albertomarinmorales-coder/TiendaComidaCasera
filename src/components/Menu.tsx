'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

/**
 * COMPLETADO: Imágenes reales integradas
 * 
 * Imágenes disponibles y mapeadas:
 * - Ensaladas: ensalada.jpg, salmorejo.jpg, ensaladilla.jpg
 * - Guarnición: pimientos.jpg, patatas.jpg  
 * - Pescados: bacalao.jpg
 * - Platos combinados: pechiga.jpg
 * - Salsas: alioli.jpg
 * - Bebidas: aquarius-n.jpg, aquarius-l.jpg, coca.jpg, zero.png, fanta-n.jpg, nestea.jpg
 */

interface MenuItem {
  id: number
  name: string
  description?: string
  price: string
  image?: string // URL de la imagen del producto - rutas locales desde /public/images/menu/
}

interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

const menuData: MenuCategory[] = [
  {
    id: 'ensaladas',
    name: 'Ensaladas',
    items: [
      { id: 1, name: 'Ensalada de casa', price: '6,50', image: '/images/menu/ensalada.jpg' },
      { id: 2, name: 'Salmorejo con Jamón y Huevo', description: 'Salmorejo con jamón y huevo.', price: '6,00', image: '/images/menu/salmorejo.jpg' },
      { id: 3, name: 'Ensaladilla Rusa', price: '5,00', image: '/images/menu/ensaladilla.jpg' }
    ]
  },
  {
    id: 'guarnicion',
    name: 'Guarnición',
    items: [
      { id: 4, name: 'Pimientos fritos', price: '6,00', image: '/images/menu/pimientos.jpg' },
      { id: 5, name: 'Patatas Fritas Enteras', price: '4,50', image: '/images/menu/patatas.jpg' },
      { id: 6, name: '1/2 Patatas Fritas', price: '3,50', image: '/images/menu/patatas.jpg' }
    ]
  },
  {
    id: 'pollo-asado',
    name: 'Pollo Asados a la Leña',
    items: [
      { id: 7, name: 'Secreto a la brasa (1 kg.)', description: 'Con ración grande patatas y alioli.', price: '20,95', image: 'https://via.placeholder.com/200x150/dc2626/ffffff?text=Secreto+Brasa' },
      { id: 8, name: 'Pollo a la Brasa con Salsa de Limón', description: 'Salsa de tomillo y romero o almendras.', price: '11,00', image: 'https://via.placeholder.com/200x150/dc2626/ffffff?text=Pollo+Limon' },
      { id: 9, name: 'Pollo Asada', description: 'A la leña con salsa de tomillo y romero o almendras', price: '11,00', image: 'https://via.placeholder.com/200x150/dc2626/ffffff?text=Pollo+Asada' },
      { id: 10, name: '1/2 Pollo a la Brasa', description: 'Salsa de limón, tomillo y romero, almendras', price: '6,50', image: 'https://via.placeholder.com/200x150/dc2626/ffffff?text=Medio+Pollo' }
    ]
  },
  {
    id: 'pescados',
    name: 'Pescados',
    items: [
      { id: 11, name: 'Bacalao con Tomate Frito', price: '7,00', image: '/images/menu/bacalao.jpg' }
    ]
  },
  {
    id: 'platos-combinados',
    name: 'Platos Combinados',
    items: [
      { id: 12, name: 'Pechuga Empanada + Patatas', price: '6,50', image: '/images/menu/pechiga.jpg' }
    ]
  },
  {
    id: 'salsas',
    name: 'Salsas',
    items: [
      { id: 13, name: 'Salsa Alioli', price: '1,20', image: '/images/menu/alioli.jpg' }
    ]
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    items: [
      { id: 14, name: 'Aquarius Naranja (1.5 lt.)', price: '2,30', image: '/images/menu/aquarius-n.jpg' },
      { id: 15, name: 'Aquarius (1.5 lt.)', price: '2,30', image: '/images/menu/aquarius-l.jpg' },
      { id: 16, name: 'Coca-Cola Sabor Original (2L)', price: '2,30', image: '/images/menu/coca.jpg' },
      { id: 17, name: 'Coca-Cola Zero Azúcar (2L)', price: '2,30', image: '/images/menu/zero.png' },
      { id: 18, name: 'Fanta Naranja (2L)', price: '2,30', image: '/images/menu/fanta-n.jpg' },
      { id: 19, name: 'Nestea sin azúcar (1.5 lt)', price: '2,20', image: '/images/menu/nestea.jpg' }
    ]
  },
  {
    id: 'postres',
    name: 'Postres',
    items: [
      { id: 20, name: 'Pan de Alcafar', price: '1,00', image: 'https://via.placeholder.com/200x150/92400e/ffffff?text=Pan+Alcafar' },
      { id: 21, name: 'Arroz con Leche', price: '2,50', image: 'https://via.placeholder.com/200x150/f3f4f6/000000?text=Arroz+Leche' },
      { id: 22, name: 'Flan', price: '2,50', image: 'https://via.placeholder.com/200x150/fbbf24/000000?text=Flan' },
      { id: 23, name: 'Natilla', price: '2,50', image: 'https://via.placeholder.com/200x150/fef3c7/000000?text=Natilla' }
    ]
  }
]

export default function Menu() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['pollo-asado']))

  const toggleCategory = (categoryId: string) => {
    const newOpenCategories = new Set(openCategories)
    if (newOpenCategories.has(categoryId)) {
      newOpenCategories.delete(categoryId)
    } else {
      newOpenCategories.add(categoryId)
    }
    setOpenCategories(newOpenCategories)
  }

  return (
    <section id="menu" className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4 font-playfair">
            Nuestra Carta
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Descubre todos nuestros platos tradicionales, elaborados con los mejores ingredientes 
            y el amor de siempre
          </p>
        </motion.div>

        {/* Menu Categories */}
        <div className="max-w-4xl mx-auto space-y-4">
          {menuData.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full px-6 py-4 bg-amber-100 hover:bg-amber-200 transition-colors duration-300 flex items-center justify-between group"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-amber-800 font-playfair">
                  {category.name}
                </h3>
                <div className="text-amber-800 transition-transform duration-300">
                  {openCategories.has(category.id) ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </div>
              </button>

              {/* Category Items */}
              <AnimatePresence>
                {openCategories.has(category.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                          className="flex gap-4 border-b border-amber-100 pb-4 last:border-b-0 last:pb-0 hover:bg-amber-50 hover:bg-opacity-70 transition-colors duration-200 cursor-pointer rounded-lg px-2 py-1"
                        >
                          {/* Imagen del producto */}
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden bg-amber-100 shadow-md border-2 border-amber-200">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center">
                                  <span className="text-amber-600 text-xs font-medium text-center px-2">
                                    Sin imagen
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Información del producto */}
                          <div className="flex-1 flex justify-between items-start">
                            <div className="flex-1 pr-4">
                              <h4 className="text-lg font-semibold text-amber-900 mb-1 font-playfair">
                                {item.name}
                              </h4>
                              {item.description && (
                                <p className="text-amber-700 text-sm leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-bold text-amber-800">
                                {item.price}€
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
          <div className="bg-amber-800 text-white rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 font-playfair">¿Listo para disfrutar?</h3>
            <p className="mb-6 text-amber-100">
              Llámanos para hacer tu pedido o reservar mesa
            </p>
            <a
              href="tel:676453062"
              className="inline-block bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              📞 676 45 30 62
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}