import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button.tsx'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      main <Link to="/products">Products</Link>
      <Button>Click me!</Button>
    </div>
  )
}
