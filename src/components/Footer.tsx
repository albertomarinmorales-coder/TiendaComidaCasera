'use client'

import React from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-amber-100">Comida Casera</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-amber-400" />
            <span className="text-amber-200">512 510 344</span>
          </div>
          <div>
            <p className="text-amber-300 text-sm">
              © 2024 Comida Casera. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer