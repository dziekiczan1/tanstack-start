import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Link to="/products/$id" params={{ id: '1' }}>
        Product 1
      </Link>
    </div>
  )
}
