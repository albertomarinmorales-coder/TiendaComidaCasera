import Menu from '../../components/Menu'

export default function MenuPage() {
  return (
    <div className="pt-6 min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <Menu />
    </div>
  )
}

export const metadata = {
  title: 'Menú - Comida Casera',
  description: 'Descubre nuestra carta completa con pollos asados, ensaladas, pescados, bebidas y postres. Comida casera tradicional.',
}