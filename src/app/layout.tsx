import type { Metadata } from 'next';
import { Playfair_Display, Open_Sans } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartProvider } from '../contexts/CartContext';

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap'
});

export const metadata: Metadata = {
    title: 'Asador El Buen Comer - Comida Para Llevar',
    description: 'Comida casera para llevar. Especialidades en carnes a la brasa y platos tradicionales. Haz tu pedido por teléfono.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={`${openSans.variable} ${playfairDisplay.variable} font-sans overflow-x-hidden`}>
                <CartProvider>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                    </div>
                </CartProvider>
            </body>
        </html>
    );
}