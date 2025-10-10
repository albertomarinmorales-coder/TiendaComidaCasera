import Menu from '../../components/Menu'

export default function MenuPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <Menu />
    </div>
  )
}

export const metadata = {
  title: 'Menú - Asador El Buen Comer',
  description: 'Descubre nuestra carta completa con pollos asados, ensaladas, pescados, bebidas y postres. Comida casera tradicional.',
}