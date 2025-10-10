import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-amber-800 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-amber-100 text-lg font-bold font-playfair">
                    <Link href="/">Asador El Buen Comer</Link>
                </div>
                <div className="space-x-6">
                    <Link href="/" className="text-amber-100 hover:text-amber-300 transition-colors duration-300 font-medium">Inicio</Link>
                    <Link href="/menu" className="text-amber-100 hover:text-amber-300 transition-colors duration-300 font-medium">Menú</Link>
                    <Link href="/#especialidades" className="text-amber-100 hover:text-amber-300 transition-colors duration-300 font-medium">Especialidades</Link>
                    <Link href="/#ubicacion" className="text-amber-100 hover:text-amber-300 transition-colors duration-300 font-medium">Ubicación</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;